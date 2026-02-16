export interface EmergencyHotline {
  emergency: string;
  domesticViolence?: string;
  suicidePrevention?: string;
  sexualAssault?: string;
  mentalHealth?: string;
}

export interface Country {
  code: string;
  name: string;
  flag: string;
  hotlines: EmergencyHotline;
}

export const COUNTRIES: Country[] = [
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    hotlines: {
      emergency: '911',
      domesticViolence: '1-800-799-7233',
      suicidePrevention: '988',
      sexualAssault: '1-800-656-4673 (RAINN)'
    }
  },
  {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    hotlines: {
      emergency: '911',
      domesticViolence: '1-800-363-9010',
      suicidePrevention: '1-833-456-4566',
      sexualAssault: '1-866-887-0015'
    }
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    hotlines: {
      emergency: '999 or 112',
      domesticViolence: '0808 2000 247 (National Domestic Abuse Helpline)',
      suicidePrevention: '116 123 (Samaritans)',
      sexualAssault: '0808 500 2222 (Rape Crisis)'
    }
  },
  {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    hotlines: {
      emergency: '000',
      domesticViolence: '1800 737 732 (1800RESPECT)',
      suicidePrevention: '13 11 14 (Lifeline)',
      sexualAssault: '1800 737 732 (1800RESPECT)'
    }
  },
  {
    code: 'NZ',
    name: 'New Zealand',
    flag: '🇳🇿',
    hotlines: {
      emergency: '111',
      domesticViolence: '0800 456 450 (Women\'s Refuge)',
      suicidePrevention: '0800 543 354 (Lifeline)',
      sexualAssault: '0800 227 233 (HELP)'
    }
  },
  {
    code: 'IE',
    name: 'Ireland',
    flag: '🇮🇪',
    hotlines: {
      emergency: '112 or 999',
      domesticViolence: '1800 341 900 (Women\'s Aid)',
      suicidePrevention: '116 123 (Samaritans)',
      sexualAssault: '1800 778 888 (Rape Crisis)'
    }
  },
  {
    code: 'IN',
    name: 'India',
    flag: '🇮🇳',
    hotlines: {
      emergency: '112',
      domesticViolence: '181 (Women Helpline)',
      suicidePrevention: '9152987821 (iCall)',
      sexualAssault: '1091 (Women in Distress)'
    }
  },
  {
    code: 'ZA',
    name: 'South Africa',
    flag: '🇿🇦',
    hotlines: {
      emergency: '10111',
      domesticViolence: '0800 150 150 (GBV Command Centre)',
      suicidePrevention: '0800 567 567 (SADAG)',
      sexualAssault: '0800 150 150'
    }
  },
  {
    code: 'DE',
    name: 'Germany',
    flag: '🇩🇪',
    hotlines: {
      emergency: '110 (Police) / 112 (Medical)',
      domesticViolence: '08000 116 016 (Hilfetelefon)',
      suicidePrevention: '0800 111 0 111 (Telefonseelsorge)',
      mentalHealth: '0800 111 0 222'
    }
  },
  {
    code: 'FR',
    name: 'France',
    flag: '🇫🇷',
    hotlines: {
      emergency: '112',
      domesticViolence: '3919 (Violence Femmes Info)',
      suicidePrevention: '3114',
      sexualAssault: '0800 05 95 95'
    }
  },
  {
    code: 'ES',
    name: 'Spain',
    flag: '🇪🇸',
    hotlines: {
      emergency: '112',
      domesticViolence: '016',
      suicidePrevention: '024',
      sexualAssault: '900 100 009'
    }
  },
  {
    code: 'IT',
    name: 'Italy',
    flag: '🇮🇹',
    hotlines: {
      emergency: '112',
      domesticViolence: '1522',
      suicidePrevention: '02 2327 2327 (Telefono Amico)',
      mentalHealth: '800 274 274'
    }
  },
  {
    code: 'NL',
    name: 'Netherlands',
    flag: '🇳🇱',
    hotlines: {
      emergency: '112',
      domesticViolence: '0800 2000 (Veilig Thuis)',
      suicidePrevention: '0800 0113 (113 Suicide Prevention)',
      mentalHealth: '088 077 5288'
    }
  },
  {
    code: 'SE',
    name: 'Sweden',
    flag: '🇸🇪',
    hotlines: {
      emergency: '112',
      domesticViolence: '020 50 50 50 (Women\'s Helpline)',
      suicidePrevention: '90101 (Mind)',
      mentalHealth: '020 22 00 60'
    }
  },
  {
    code: 'NO',
    name: 'Norway',
    flag: '🇳🇴',
    hotlines: {
      emergency: '112',
      domesticViolence: '116 006',
      suicidePrevention: '116 123 (Mental Helse)',
      mentalHealth: '116 123'
    }
  },
  {
    code: 'BR',
    name: 'Brazil',
    flag: '🇧🇷',
    hotlines: {
      emergency: '190 (Police) / 192 (Medical)',
      domesticViolence: '180 (Central de Atendimento à Mulher)',
      suicidePrevention: '188 (CVV)',
      mentalHealth: '188'
    }
  },
  {
    code: 'MX',
    name: 'Mexico',
    flag: '🇲🇽',
    hotlines: {
      emergency: '911',
      domesticViolence: '800 108 4053',
      suicidePrevention: '800 290 0024 (SAPTEL)',
      mentalHealth: '800 472 7835'
    }
  },
  {
    code: 'JP',
    name: 'Japan',
    flag: '🇯🇵',
    hotlines: {
      emergency: '110 (Police) / 119 (Medical)',
      domesticViolence: '0570 0 55210 (DV Hotline)',
      suicidePrevention: '0120 783 556 (TELL)',
      mentalHealth: '0570 064 556'
    }
  },
  {
    code: 'SG',
    name: 'Singapore',
    flag: '🇸🇬',
    hotlines: {
      emergency: '999 (Police) / 995 (Ambulance)',
      domesticViolence: '1800 777 0000 (TRANS SAFE)',
      suicidePrevention: '1800 221 4444 (SOS)',
      mentalHealth: '6389 2222 (IMH)'
    }
  },
  {
    code: 'PH',
    name: 'Philippines',
    flag: '🇵🇭',
    hotlines: {
      emergency: '911',
      domesticViolence: '8-1-111 (PNP Women\'s Desk)',
      suicidePrevention: '2919 (NCMH Crisis Hotline)',
      mentalHealth: '0917 899 8727 (In Touch)'
    }
  },
  {
    code: 'BW',
    name: 'Botswana',
    flag: '🇧🇼',
    hotlines: {
      emergency: '999',
      domesticViolence: '391 1270 (Botswana Gender Affairs)',
      suicidePrevention: '391 1270 / 390 7654 (Lifeline Botswana)',
      mentalHealth: '390 7654'
    }
  },
  {
    code: 'KE',
    name: 'Kenya',
    flag: '🇰🇪',
    hotlines: {
      emergency: '999 or 112',
      domesticViolence: '1195 (Gender Violence Recovery Centre)',
      suicidePrevention: '1190 (Befrienders Kenya)',
      mentalHealth: '0800 721 721'
    }
  },
  {
    code: 'NG',
    name: 'Nigeria',
    flag: '🇳🇬',
    hotlines: {
      emergency: '112',
      domesticViolence: '0800 333 333 (Project Alert)',
      suicidePrevention: '0800 456 7890 (Lagos Suicide Hotline)',
      mentalHealth: '0800 456 7890'
    }
  },
  {
    code: 'GH',
    name: 'Ghana',
    flag: '🇬🇭',
    hotlines: {
      emergency: '999 or 112',
      domesticViolence: '055 100 0900 (DOVVSU)',
      suicidePrevention: '020 681 4663 (Befrienders)',
      mentalHealth: '020 681 4663'
    }
  },
  {
    code: 'NA',
    name: 'Namibia',
    flag: '🇳🇦',
    hotlines: {
      emergency: '10111',
      domesticViolence: '0800 110 111 (Lifeline)',
      suicidePrevention: '0800 110 111',
      mentalHealth: '081 968 2739'
    }
  },
  {
    code: 'ZW',
    name: 'Zimbabwe',
    flag: '🇿🇼',
    hotlines: {
      emergency: '999',
      domesticViolence: '080 80111 (Musasa Project)',
      suicidePrevention: '080 80111',
      mentalHealth: '080 80111'
    }
  },
  {
    code: 'UG',
    name: 'Uganda',
    flag: '🇺🇬',
    hotlines: {
      emergency: '999',
      domesticViolence: '0800 200 600 (MIFUMI)',
      suicidePrevention: '0800 211 077',
      mentalHealth: '0800 211 077'
    }
  },
  {
    code: 'TZ',
    name: 'Tanzania',
    flag: '🇹🇿',
    hotlines: {
      emergency: '112',
      domesticViolence: '0800 750 075 (Wote Sawa)',
      suicidePrevention: '0800 750 075',
      mentalHealth: '0800 750 075'
    }
  },
  {
    code: 'ET',
    name: 'Ethiopia',
    flag: '🇪🇹',
    hotlines: {
      emergency: '911',
      domesticViolence: '011 551 4848',
      suicidePrevention: '801 100 100',
      mentalHealth: '801 100 100'
    }
  },
  {
    code: 'EG',
    name: 'Egypt',
    flag: '🇪🇬',
    hotlines: {
      emergency: '122',
      domesticViolence: '15115 (National Women\'s Complaint Office)',
      suicidePrevention: '762 1602 (Befrienders Cairo)',
      mentalHealth: '762 1602'
    }
  },
  {
    code: 'MA',
    name: 'Morocco',
    flag: '🇲🇦',
    hotlines: {
      emergency: '15 (Medical) / 19 (Police)',
      domesticViolence: '08 00 00 83 83 (INSAF)',
      suicidePrevention: '0801 000 162',
      mentalHealth: '0801 000 162'
    }
  },
  {
    code: 'PK',
    name: 'Pakistan',
    flag: '🇵🇰',
    hotlines: {
      emergency: '112',
      domesticViolence: '1099 (Women Helpline)',
      suicidePrevention: '042 3576 1111 (Umang)',
      mentalHealth: '042 3576 1111'
    }
  },
  {
    code: 'BD',
    name: 'Bangladesh',
    flag: '🇧🇩',
    hotlines: {
      emergency: '999',
      domesticViolence: '109 (National Helpline)',
      suicidePrevention: '096 667 772 22 (Kaan Pete Roi)',
      mentalHealth: '096 667 772 22'
    }
  },
  {
    code: 'PL',
    name: 'Poland',
    flag: '🇵🇱',
    hotlines: {
      emergency: '112',
      domesticViolence: '800 120 002 (Niebieska Linia)',
      suicidePrevention: '116 123',
      mentalHealth: '116 123'
    }
  },
  {
    code: 'PT',
    name: 'Portugal',
    flag: '🇵🇹',
    hotlines: {
      emergency: '112',
      domesticViolence: '800 202 148',
      suicidePrevention: '808 24 24 24 (SOS Voz Amiga)',
      mentalHealth: '808 24 24 24'
    }
  },
  {
    code: 'GR',
    name: 'Greece',
    flag: '🇬🇷',
    hotlines: {
      emergency: '112',
      domesticViolence: '15900 (SOS Helpline)',
      suicidePrevention: '1018',
      mentalHealth: '1018'
    }
  },
  {
    code: 'TR',
    name: 'Türkiye',
    flag: '🇹🇷',
    hotlines: {
      emergency: '112',
      domesticViolence: '183 (KADES)',
      suicidePrevention: '182 (Crisis Line)',
      mentalHealth: '182'
    }
  },
  {
    code: 'RU',
    name: 'Russia',
    flag: '🇷🇺',
    hotlines: {
      emergency: '112',
      domesticViolence: '8-800-7000-600 (Anna Centre)',
      suicidePrevention: '8-800-2000-122',
      mentalHealth: '8-800-2000-122'
    }
  },
  {
    code: 'CN',
    name: 'China',
    flag: '🇨🇳',
    hotlines: {
      emergency: '110 (Police) / 120 (Medical)',
      domesticViolence: '12338 (Women\'s Hotline)',
      suicidePrevention: '010-82951332 (Beijing)',
      mentalHealth: '010-82951332'
    }
  },
  {
    code: 'KR',
    name: 'South Korea',
    flag: '🇰🇷',
    hotlines: {
      emergency: '112 (Police) / 119 (Medical)',
      domesticViolence: '1366 (Women\'s Hotline)',
      suicidePrevention: '1393 (Korea Lifeline)',
      mentalHealth: '1577-0199'
    }
  }
];

/** Map common IANA timezone regions to country codes we support */
const TIMEZONE_TO_COUNTRY: Record<string, string> = {
  'Africa/Gaborone': 'BW',
  'Africa/Nairobi': 'KE',
  'Africa/Lagos': 'NG',
  'Africa/Accra': 'GH',
  'Africa/Windhoek': 'NA',
  'Africa/Harare': 'ZW',
  'Africa/Kampala': 'UG',
  'Africa/Dar_es_Salaam': 'TZ',
  'Africa/Addis_Ababa': 'ET',
  'Africa/Cairo': 'EG',
  'Africa/Casablanca': 'MA',
  'America/New_York': 'US',
  'America/Los_Angeles': 'US',
  'America/Chicago': 'US',
  'America/Denver': 'US',
  'America/Toronto': 'CA',
  'America/Vancouver': 'CA',
  'Europe/London': 'GB',
  'Europe/Dublin': 'IE',
  'Australia/Sydney': 'AU',
  'Australia/Melbourne': 'AU',
  'Pacific/Auckland': 'NZ',
  'Asia/Kolkata': 'IN',
  'Asia/Singapore': 'SG',
  'Asia/Tokyo': 'JP',
  'Asia/Shanghai': 'CN',
  'Asia/Seoul': 'KR',
  'Europe/Paris': 'FR',
  'Europe/Berlin': 'DE',
  'Europe/Madrid': 'ES',
  'Europe/Rome': 'IT',
  'Europe/Amsterdam': 'NL',
  'Europe/Stockholm': 'SE',
  'Europe/Oslo': 'NO',
  'America/Sao_Paulo': 'BR',
  'America/Mexico_City': 'MX',
  'Asia/Manila': 'PH',
};

/**
 * Detect a suggested country from the browser (timezone). Privacy-safe: no IP or GPS.
 * Returns a country code we support, or null if unknown.
 */
export function detectCountryFromBrowser(): string | null {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return TIMEZONE_TO_COUNTRY[tz] ?? null;
  } catch {
    return null;
  }
}

export function getCountryByCode(code: string): Country | undefined {
  return COUNTRIES.find(c => c.code === code);
}

export function getDefaultCountry(): Country {
  return COUNTRIES[0]; // Default to US
}
