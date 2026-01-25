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
  }
];

export function getCountryByCode(code: string): Country | undefined {
  return COUNTRIES.find(c => c.code === code);
}

export function getDefaultCountry(): Country {
  return COUNTRIES[0]; // Default to US
}
