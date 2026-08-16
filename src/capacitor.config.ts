import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.azzar.ajisaka',
  appName: 'Ajisaka',
  webDir: 'dist',
  plugins: {
    StatusBar: {
      overlaysWebView: false,
      backgroundColor: '#fdfaf2',
      style: 'LIGHT' // Since background is light, use dark text for the status bar
    }
  }
};

export default config;
