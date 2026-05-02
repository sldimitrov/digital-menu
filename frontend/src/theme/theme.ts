import { createTheme } from '@mui/material/styles'
import { colorTokens, radiusTokens, spacingTokens, typographyTokens } from './tokens'

export const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colorTokens.primary,
      dark: colorTokens.primaryDark,
    },
    background: {
      default: colorTokens.background,
      paper: colorTokens.surface,
    },
    text: {
      primary: colorTokens.textPrimary,
      secondary: colorTokens.textSecondary,
    },
    divider: colorTokens.border,
  },
  spacing: spacingTokens.sm,
  shape: {
    borderRadius: radiusTokens.md,
  },
  typography: {
    fontFamily: typographyTokens.fontFamily,
    h4: {
      fontWeight: 800,
      fontSize: '1.6rem',
      lineHeight: 1.25,
    },
    h6: {
      fontWeight: 700,
      fontSize: '1.05rem',
    },
    body1: {
      fontSize: '0.95rem',
    },
    body2: {
      fontSize: '0.85rem',
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: spacingTokens.lg,
          paddingRight: spacingTokens.lg,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: radiusTokens.lg,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: radiusTokens.pill,
          textTransform: 'none',
          fontWeight: 700,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: radiusTokens.pill,
          fontWeight: 700,
        },
      },
    },
  },
})
