# Build Guidance — TORQ Design System (Layer 1)

This directive defines the tactical design rules for the TORQ platform. It inherits the **8pt Grid Protocol** and the **Agency Cinematic Standard**.

## 1. Grid & Spacing (8pt Protocol)
- **Base Unit**: 8px.
- **Section Padding**: `clamp(4rem, 10vh, 8rem)` Y-axis; `clamp(2rem, 5vw, 4rem)` X-axis.
- **Container Max-Width**: 1440px / 1680px (Fluid).
- **Gap Scaling**: Consistent multiples of 8 (8, 16, 24, 32, 48, 64).

## 2. Typography (Editorial Class)
- **H1 / Display**: Anton. Uppercase, tight tracking (-0.02em), leading 0.9.
- **Body / Metadata**: Inter. Medium/Semibold for labels. Light/Regular for long-form.
- **Hierarchy**:
  - `Display XL`: 120px+ (Anton).
  - `Display L`: 64px - 80px (Anton).
  - `Label M`: 14px, Uppercase, 20% Tracking (Inter).
  - `Body L`: 18px / 20px (Inter).

## 3. Color & Materials
- **Primary**: #EF4826 (Torq Red).
- **Surface**: #0A0A0A (Matte Black).
- **Text**: #FFFFFF (Pure White) / #A3A3A3 (Muted Grey).
- **Glass**: 24px Blur, #FFFFFF08 Fill, #FFFFFF10 Stroke (1px).

## 4. Interaction & Motion (Cinematic Control)
- **Scroll**: Lenis Smooth Scroll (Default).
- **Fades**: mode="wait" (AnimatePresence), 0.8s - 1.2s Duration.
- **Exits**: No bouncy spring physics. Use quintic/exponential easing: `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Indicators**: Discreet, thin-line progress bars (1px stroke).

## 5. UI Guardrails
- **Corner Radius**: 0px (Sharp). No exceptions without CEO approval.
- **Buttons**: Flat fills (#EF4826) or Outlines (1px Grey). No drop shadows.
- **Logos**: Balanced presence. Always monochrome except for the Torq/ mark.
