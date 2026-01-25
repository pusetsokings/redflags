import { getJournalEntries, getAssessments } from './storage';
import type { JournalEntry } from './types';

export interface ExportOptions {
  format: 'json' | 'csv' | 'pdf';
  includeEntries: boolean;
  includeAssessments: boolean;
  dateRange?: {
    from: string;
    to: string;
  };
}

export async function exportToCSV(options: ExportOptions): Promise<string> {
  const entries = options.includeEntries ? await getJournalEntries() : [];
  const assessments = options.includeAssessments ? await getAssessments() : [];

  // Filter by date range if provided
  let filteredEntries = entries;
  if (options.dateRange) {
    filteredEntries = entries.filter(entry => {
      const entryDate = new Date(entry.date);
      const fromDate = new Date(options.dateRange!.from);
      const toDate = new Date(options.dateRange!.to);
      toDate.setHours(23, 59, 59, 999);
      return entryDate >= fromDate && entryDate <= toDate;
    });
  }

  // CSV Headers
  const csvRows: string[] = [];
  
  if (options.includeEntries && filteredEntries.length > 0) {
    // Journal Entries CSV
    csvRows.push('=== JOURNAL ENTRIES ===');
    csvRows.push('Date,Context,Mood,Emotions,Content,Red Flags Count,Severity');
    
    filteredEntries.forEach(entry => {
      const date = new Date(entry.date).toLocaleDateString();
      const emotions = entry.emotions.join('; ');
      const flagCount = entry.analysis?.flags?.length || 0;
      const severity = entry.analysis?.severity || 'none';
      
      // Escape content for CSV (handle commas, quotes, newlines)
      const escapedContent = entry.content
        .replace(/"/g, '""')
        .replace(/\n/g, ' ')
        .replace(/\r/g, '');
      
      csvRows.push(
        `"${date}","${entry.context}","${entry.mood}","${emotions}","${escapedContent}","${flagCount}","${severity}"`
      );
    });
    
    csvRows.push(''); // Empty row separator
  }

  if (options.includeAssessments && assessments.length > 0) {
    // Assessments CSV
    csvRows.push('=== ASSESSMENTS ===');
    csvRows.push('Date,Overall Score,Trust,Communication,Respect,Independence,Safety,Emotional');
    
    assessments.forEach(assessment => {
      const date = new Date(assessment.date).toLocaleDateString();
      const dims = assessment.dimensions;
      csvRows.push(
        `"${date}","${assessment.overallScore}","${dims.trust}","${dims.communication}","${dims.respect}","${dims.independence}","${dims.safety}","${dims.emotional}"`
      );
    });
  }

  return csvRows.join('\n');
}

export async function exportToPDF(options: ExportOptions): Promise<Blob> {
  const entries = options.includeEntries ? await getJournalEntries() : [];
  const assessments = options.includeAssessments ? await getAssessments() : [];

  // Filter by date range if provided
  let filteredEntries = entries;
  if (options.dateRange) {
    filteredEntries = entries.filter(entry => {
      const entryDate = new Date(entry.date);
      const fromDate = new Date(options.dateRange!.from);
      const toDate = new Date(options.dateRange!.to);
      toDate.setHours(23, 59, 59, 999);
      return entryDate >= fromDate && entryDate <= toDate;
    });
  }

  // Calculate statistics
  const totalEntries = filteredEntries.length;
  const totalFlags = filteredEntries.reduce((sum, e) => sum + (e.analysis?.flags?.length || 0), 0);
  const avgMood = totalEntries > 0
    ? filteredEntries.reduce((sum, e) => sum + e.mood, 0) / totalEntries
    : 0;
  
  const flagsByType: Record<string, number> = {};
  filteredEntries.forEach(entry => {
    entry.analysis?.flags?.forEach(flag => {
      flagsByType[flag.type] = (flagsByType[flag.type] || 0) + 1;
    });
  });

  const topFlags = Object.entries(flagsByType)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // Generate HTML for PDF
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>FlagSense Report</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 40px;
      color: #1A1A2E;
      line-height: 1.6;
    }
    .header {
      border-bottom: 4px solid #4B2E83;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    h1 {
      color: #4B2E83;
      margin: 0;
      font-size: 32px;
    }
    .subtitle {
      color: #495057;
      margin-top: 5px;
    }
    .section {
      margin-bottom: 40px;
    }
    h2 {
      color: #4B2E83;
      border-bottom: 2px solid #C7B8FF;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-bottom: 30px;
    }
    .stat-card {
      background: #F8F9FA;
      border: 3px solid #1A1A2E;
      border-radius: 12px;
      padding: 20px;
      text-align: center;
    }
    .stat-value {
      font-size: 36px;
      font-weight: bold;
      color: #4B2E83;
      margin-bottom: 5px;
    }
    .stat-label {
      color: #495057;
      font-size: 14px;
    }
    .flag-list {
      list-style: none;
      padding: 0;
    }
    .flag-item {
      background: #FFF;
      border: 2px solid #1A1A2E;
      border-radius: 8px;
      padding: 15px;
      margin-bottom: 10px;
    }
    .flag-type {
      font-weight: bold;
      color: #FF5A5F;
      margin-bottom: 5px;
    }
    .entry {
      background: #F8F9FA;
      border-left: 4px solid #4B2E83;
      padding: 15px;
      margin-bottom: 15px;
      border-radius: 8px;
    }
    .entry-date {
      color: #495057;
      font-size: 12px;
      margin-bottom: 5px;
    }
    .entry-content {
      margin-top: 10px;
    }
    .footer {
      margin-top: 50px;
      padding-top: 20px;
      border-top: 2px solid #E9ECEF;
      text-align: center;
      color: #495057;
      font-size: 12px;
    }
    @media print {
      body { padding: 20px; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>FlagSense Report</h1>
    <p class="subtitle">Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
    ${options.dateRange ? `<p class="subtitle">Date Range: ${new Date(options.dateRange.from).toLocaleDateString()} - ${new Date(options.dateRange.to).toLocaleDateString()}</p>` : ''}
  </div>

  <div class="section">
    <h2>Summary Statistics</h2>
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">${totalEntries}</div>
        <div class="stat-label">Total Entries</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${totalFlags}</div>
        <div class="stat-label">Red Flags Detected</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${avgMood.toFixed(1)}</div>
        <div class="stat-label">Average Mood</div>
      </div>
    </div>
  </div>

  ${topFlags.length > 0 ? `
  <div class="section">
    <h2>Top Red Flags</h2>
    <ul class="flag-list">
      ${topFlags.map(([type, count]) => `
        <li class="flag-item">
          <div class="flag-type">${type.replace(/([A-Z])/g, ' $1').trim()}</div>
          <div>Detected ${count} time${count > 1 ? 's' : ''}</div>
        </li>
      `).join('')}
    </ul>
  </div>
  ` : ''}

  ${options.includeEntries && filteredEntries.length > 0 ? `
  <div class="section">
    <h2>Journal Entries</h2>
    ${filteredEntries.slice(0, 20).map(entry => `
      <div class="entry">
        <div class="entry-date">${new Date(entry.date).toLocaleDateString()} - ${entry.context}</div>
        <div>Mood: ${entry.mood}/5 | Flags: ${entry.analysis?.flags?.length || 0}</div>
        <div class="entry-content">${entry.content.substring(0, 200)}${entry.content.length > 200 ? '...' : ''}</div>
      </div>
    `).join('')}
    ${filteredEntries.length > 20 ? `<p><em>... and ${filteredEntries.length - 20} more entries</em></p>` : ''}
  </div>
  ` : ''}

  <div class="footer">
    <p>This report was generated by FlagSense - Your privacy-first relationship wellness tracker.</p>
    <p>All data remains on your device. This report contains anonymized insights only.</p>
  </div>
</body>
</html>
  `;

  // Convert HTML to PDF using browser's print functionality
  // Note: This requires a library like jsPDF or html2pdf
  // For now, we'll return the HTML as a blob that can be printed
  return new Blob([htmlContent], { type: 'text/html' });
}

// Helper to download file
export function downloadFile(content: string | Blob, filename: string, mimeType?: string): void {
  const blob = content instanceof Blob 
    ? content 
    : new Blob([content], { type: mimeType || 'text/plain' });
  
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

