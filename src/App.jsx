import { useState, useEffect } from "react";

const ACCENT = "#007AFF";
const ACCENT_DARK = "#0A84FF";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [view, setView] = useState("login"); // "login" | "dashboard" | "register" | "code"
  const [darkMode, setDarkMode] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passFocused, setPassFocused] = useState(false);
  const [hoverBtn, setHoverBtn] = useState(false);
  const [hoverCode, setHoverCode] = useState(false);
  const [hoverRegister, setHoverRegister] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Productos de ejemplo para el dashboard
  const [products] = useState([
    {
      id: 1,
      name: "Campaña Summer Sale",
      status: "ready",
      assets: 5,
      verified: 5,
      category: "Social Ads",
    },
    {
      id: 2,
      name: "Landing Black Friday",
      status: "pending",
      assets: 8,
      verified: 3,
      category: "Landing Page",
    },
    {
      id: 3,
      name: "Email Bienvenida",
      status: "review",
      assets: 4,
      verified: 4,
      category: "Email",
    },
    {
      id: 4,
      name: "Ads Google Q4",
      status: "ready",
      assets: 6,
      verified: 6,
      category: "Search Ads",
    },
    {
      id: 5,
      name: "Redes Sociales Oct",
      status: "pending",
      assets: 12,
      verified: 7,
      category: "Social Ads",
    },
  ]);

  const [activeTab, setActiveTab] = useState("productos");
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [hoveredTab, setHoveredTab] = useState(null);
  const [hoveredAction, setHoveredAction] = useState(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setDarkMode(mq.matches);
    const handler = (e) => setDarkMode(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    setTimeout(() => setMounted(true), 50);
  }, []);

  const colors = {
    bg: darkMode ? "#1C1C1E" : "#F2F2F7",
    bgGrouped: darkMode ? "#1C1C1E" : "#F2F2F7",
    bgCard: darkMode ? "#2C2C2E" : "#FFFFFF",
    bgCardHover: darkMode ? "#3A3A3C" : "#F9F9FB",
    labelPrimary: darkMode ? "#FFFFFF" : "#000000",
    labelSecondary: darkMode ? "#EBEBF5CC" : "#3C3C4399",
    labelTertiary: darkMode ? "#EBEBF566" : "#3C3C4360",
    separator: darkMode ? "#38383A" : "#C6C6C8",
    accent: darkMode ? ACCENT_DARK : ACCENT,
    success: darkMode ? "#30D158" : "#34C759",
    warning: darkMode ? "#FFD60A" : "#FF9500",
    danger: darkMode ? "#FF453A" : "#FF3B30",
    navBg: darkMode ? "#1C1C1E" : "#FFFFFF",
    inputBg: darkMode ? "#2C2C2E" : "#FFFFFF",
  };

  const isFormValid = email.length > 3 && email.includes("@") && password.length >= 6;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setLoading(true);
    setError("");
    // TODO: Integrar autenticación real con backend/supabase
    await new Promise((r) => setTimeout(r, 1200));
    if (email === "demo@clonepro.com" && password === "123456") {
      setView("dashboard");
    } else {
      setError("Correo o contraseña incorrectos. Usa demo@clonepro.com / 123456");
    }
    setLoading(false);
  };

  const handleCodeLogin = () => {
    // TODO: Implementar flujo de código mágico por correo
    alert("Función de código por correo: próximamente disponible.");
  };

  const getStatusLabel = (status) => {
    if (status === "ready") return "Listo";
    if (status === "pending") return "Pendiente";
    if (status === "review") return "En revisión";
    return status;
  };

  const getStatusColor = (status) => {
    if (status === "ready") return colors.success;
    if (status === "pending") return colors.warning;
    if (status === "review") return colors.accent;
    return colors.labelSecondary;
  };

  const getStatusBg = (status) => {
    if (status === "ready") return darkMode ? "#30D15820" : "#34C75918";
    if (status === "pending") return darkMode ? "#FFD60A20" : "#FF950018";
    if (status === "review") return darkMode ? "#0A84FF20" : "#007AFF18";
    return darkMode ? "#FFFFFF10" : "#00000010";
  };

  const styles = {
    root: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px 16px",
      paddingTop: "env(safe-area-inset-top, 20px)",
      background: colors.bgGrouped,
      fontFamily:
        "-apple-system, 'SF Pro Display', 'Inter Tight', 'Segoe UI', sans-serif",
      transition: "background 0.3s ease",
    },
    fadeUp: {
      opacity: mounted ? 1 : 0,
      transform: mounted ? "translateY(0)" : "translateY(24px)",
      transition: "opacity 0.5s cubic-bezier(0.4,0,0.2,1), transform 0.5s cubic-bezier(0.4,0,0.2,1)",
      width: "100%",
      maxWidth: "390px",
    },
    header: {
      textAlign: "center",
      marginBottom: "32px",
    },
    logo: {
      display: "block",
      margin: "0 auto 20px",
      borderRadius: "16px",
      width: "72px",
      height: "72px",
      background: `linear-gradient(135deg, ${colors.accent} 0%, #5856D6 100%)`,
      boxShadow: `0 8px 24px ${colors.accent}40`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "32px",
      marginLeft: "auto",
      marginRight: "auto",
    },
    h1: {
      fontFamily: "-apple-system, 'SF Pro Display', sans-serif",
      fontSize: "28px",
      fontWeight: "700",
      letterSpacing: "0.36px",
      color: colors.labelPrimary,
      lineHeight: "34px",
      marginBottom: "6px",
      margin: "0 0 6px 0",
    },
    subtitle: {
      fontSize: "17px",
      color: colors.labelSecondary,
      letterSpacing: "-0.43px",
      margin: 0,
    },
    card: {
      background: colors.bgCard,
      borderRadius: "16px",
      marginBottom: "16px",
      overflow: "hidden",
      boxShadow: darkMode
        ? "0 2px 12px rgba(0,0,0,0.4)"
        : "0 2px 12px rgba(0,0,0,0.08)",
      transition: "background 0.3s ease, box-shadow 0.3s ease",
    },
    fieldTop: {
      padding: "0 16px",
      borderBottom: `0.5px solid ${colors.separator}`,
    },
    fieldBottom: {
      padding: "0 16px",
    },
    label: {
      display: "block",
      fontSize: "13px",
      color: colors.labelSecondary,
      letterSpacing: "-0.08px",
      paddingTop: "11px",
      paddingBottom: "2px",
    },
    input: (focused) => ({
      width: "100%",
      height: "auto",
      paddingLeft: "0",
      paddingBottom: "11px",
      paddingTop: "2px",
      borderRadius: "0",
      background: "transparent",
      border: "none",
      outline: "none",
      fontSize: "17px",
      color: colors.labelPrimary,
      letterSpacing: "-0.43px",
      fontFamily: "inherit",
      caretColor: colors.accent,
      boxSizing: "border-box",
      transition: "color 0.2s",
    }),
    btnPrimary: (disabled, hover) => ({
      width: "100%",
      padding: "16px",
      borderRadius: "14px",
      border: "none",
      background: disabled
        ? darkMode ? "#48484A" : "#C7C7CC"
        : hover
        ? darkMode ? "#0A6EDC" : "#0066CC"
        : colors.accent,
      color: disabled ? colors.labelTertiary : "#FFFFFF",
      fontSize: "17px",
      fontWeight: "600",
      letterSpacing: "-0.43px",
      cursor: disabled ? "not-allowed" : "pointer",
      fontFamily: "inherit",
      transition: "background 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease",
      transform: hover && !disabled ? "scale(0.99)" : "scale(1)",
      boxShadow: !disabled
        ? hover
          ? `0 4px 16px ${colors.accent}50`
          : `0 2px 8px ${colors.accent}30`
        : "none",
    }),
    btnCode: (hover) => ({
      background: "none",
      border: "none",
      cursor: "pointer",
      fontSize: "15px",
      color: hover ? (darkMode ? "#5BA4FF" : "#0055CC") : colors.accent,
      fontWeight: "600",
      fontFamily: "inherit",
      letterSpacing: "-0.23px",
      transition: "color 0.2s, transform 0.1s",
      transform: hover ? "scale(0.98)" : "scale(1)",
      padding: "4px 8px",
      borderRadius: "6px",
    }),
    errorBox: {
      background: darkMode ? "#FF453A20" : "#FF3B3018",
      border: `1px solid ${colors.danger}40`,
      borderRadius: "12px",
      padding: "12px 16px",
      marginBottom: "12px",
      fontSize: "14px",
      color: colors.danger,
      letterSpacing: "-0.2px",
      textAlign: "center",
    },
    footer: {
      textAlign: "center",
      marginTop: "20px",
      fontSize: "15px",
      letterSpacing: "-0.23px",
      color: colors.labelSecondary,
    },
    footerLink: (hover) => ({
      color: hover ? (darkMode ? "#5BA4FF" : "#0055CC") : colors.accent,
      textDecoration: "none",
      fontWeight: "600",
      cursor: "pointer",
      transition: "color 0.2s",
    }),
    loadingSpinner: {
      display: "inline-block",
      width: "16px",
      height: "16px",
      border: "2px solid rgba(255,255,255,0.3)",
      borderTopColor: "#FFFFFF",
      borderRadius: "50%",
      animation: "spin 0.7s linear infinite",
      marginRight: "8px",
      verticalAlign: "middle",
    },
    // Dashboard styles
    dashRoot: {
      minHeight: "100vh",
      background: colors.bgGrouped,
      fontFamily: "-apple-system, 'SF Pro Display', 'Inter Tight', 'Segoe UI', sans-serif",
      transition: "background 0.3s ease",
      paddingBottom: "80px",
    },
    nav: {
      background: colors.navBg,
      borderBottom: `0.5px solid ${colors.separator}`,
      padding: "0 20px",
      position: "sticky",
      top: 0,
      zIndex: 100,
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      boxShadow: darkMode
        ? "0 1px 0 rgba(255,255,255,0.08)"
        : "0 1px 0 rgba(0,0,0,0.08)",
    },
    navInner: {
      maxWidth: "900px",
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "56px",
    },
    navLogo: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    navLogoIcon: {
      width: "32px",
      height: "32px",
      borderRadius: "8px",
      background: `linear-gradient(135deg, ${colors.accent} 0%, #5856D6 100%)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "16px",
    },
    navBrand: {
      fontSize: "17px",
      fontWeight: "700",
      color: colors.labelPrimary,
      letterSpacing: "-0.43px",
    },
    navActions: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    avatarBtn: {
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      background: `linear-gradient(135deg, ${colors.accent} 0%, #5856D6 100%)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
      fontWeight: "700",
      color: "#FFFFFF",
      border: "none",
      cursor: "pointer",
    },
    dashContent: {
      maxWidth: "900px",
      margin: "0 auto",
      padding: "24px 20px",
    },
    dashHeader: {
      marginBottom: "24px",
    },
    dashTitle: {
      fontSize: "28px",
      fontWeight: "700",
      color: colors.labelPrimary,
      letterSpacing: "0.36px",
      lineHeight: "34px",
      margin: "0 0 4px 0",
    },
    dashSubtitle: {
      fontSize: "15px",
      color: colors.labelSecondary,
      letterSpacing: "-0.23px",
      margin: 0,
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "12px",
      marginBottom: "24px",
    },
    statCard: (idx) => ({
      background: colors.bgCard,
      borderRadius: "16px",
      padding: "16px",
      boxShadow: darkMode
        ? "0 2px 8px rgba(0,0,0,0.3)"
        : "0 2px 8px rgba(0,0,0,0.06)",
      transition: "background 0.3s ease",
    }),
    statValue: {
      fontSize: "28px",
      fontWeight: "700",
      color: colors.labelPrimary,
      lineHeight: "34px",
      letterSpacing: "0.36px",
    },
    statLabel: {
      fontSize: "13px",
      color: colors.labelSecondary,
      letterSpacing: "-0.08px",
      marginTop: "2px",
    },
    tabs: {
      display: "flex",
      gap: "4px",
      background: darkMode ? "#2C2C2E" : "#E5E5EA",
      borderRadius: "12px",
      padding: "2px",
      marginBottom: "20px",
    },
    tab: (active, hover) => ({
      flex: 1,
      padding: "8px 12px",
      borderRadius: "10px",
      border: "none",
      background: active ? colors.bgCard : hover ? (darkMode ? "#3A3A3C" : "#DDDDE3") : "transparent",
      color: active ? colors.labelPrimary : colors.labelSecondary,
      fontSize: "15px",
      fontWeight: active ? "600" : "400",
      cursor: "pointer",
      fontFamily: "inherit",
      letterSpacing: "-0.23px",
      transition: "all 0.2s ease",
      boxShadow: active
        ? darkMode
          ? "0 1px 4px rgba(0,0,0,0.3)"
          : "0 1px 4px rgba(0,0,0,0.1)"
        : "none",
    }),
    productList: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    productCard: (hover) => ({
      background: hover ? colors.bgCardHover : colors.bgCard,
      borderRadius: "16px",
      padding: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: darkMode
        ? "0 2px 8px rgba(0,0,0,0.3)"
        : "0 2px 8px rgba(0,0,0,0.06)",
      cursor: "pointer",
      transition: "all 0.2s ease",
      transform: hover ? "translateY(-1px)" : "translateY(0)",
    }),
    productLeft: {
      display: "flex",
      alignItems: "center",
      gap: "14px",
      flex: 1,
    },
    productIcon: (status) => ({
      width: "44px",
      height: "44px",
      borderRadius: "12px",
      background: getStatusBg(status),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "20px",
      flexShrink: 0,
    }),
    productInfo: {
      flex: 1,
      minWidth: 0,
    },
    productName: {
      fontSize: "17px",
      fontWeight: "600",
      color: colors.labelPrimary,
      letterSpacing: "-0.43px",
      margin: "0 0 3px 0",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    productMeta: {
      fontSize: "13px",
      color: colors.labelSecondary,
      letterSpacing: "-0.08px",
      margin: 0,
    },
    productRight: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: "6px",
      marginLeft: "12px",
    },
    statusBadge: (status) => ({
      background: getStatusBg(status),
      color: getStatusColor(status),
      fontSize: "12px",
      fontWeight: "600",
      padding: "3px 9px",
      borderRadius: "20px",
      letterSpacing: "-0.08px",
      whiteSpace: "nowrap",
    }),
    progressBar: {
      width: "72px",
      height: "4px",
      background: darkMode ? "#3A3A3C" : "#E5E5EA",
      borderRadius: "2px",
      overflow: "hidden",
    },
    progressFill: (pct, status) => ({
      height: "100%",
      width: `${pct}%`,
      background: getStatusColor(status),
      borderRadius: "2px",
      transition: "width 0.6s ease",
    }),
    bottomTab: {
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      background: colors.navBg,
      borderTop: `0.5px solid ${colors.separator}`,
      display: "flex",
      padding: "8px 0",
      paddingBottom: "env(safe-area-inset-bottom, 8px)",
      zIndex: 100,
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
    },
    bottomTabBtn: (active) => ({
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "2px",
      border: "none",
      background: "transparent",
      cursor: "pointer",
      padding: "4px 0",
      fontFamily: "inherit",
    }),
    bottomTabIcon: (active) => ({
      fontSize: "22px",
      lineHeight: "1",
      filter: active ? "none" : "opacity(0.5)",
    }),
    bottomTabLabel: (active) => ({
      fontSize: "10px",
      fontWeight: active ? "600" : "400",
      color: active ? colors.accent : colors.labelSecondary,
      letterSpacing: "-0.08px",
    }),
    emptyState: {
      textAlign: "center",
      padding: "48px 24px",
      color: colors.labelSecondary,
    },
    emptyIcon: {
      fontSize: "48px",
      marginBottom: "16px",
      display: "block",
    },
    emptyTitle: {
      fontSize: "20px",
      fontWeight: "600",
      color: colors.labelPrimary,
      marginBottom: "8px",
    },
    emptyText: {
      fontSize: "15px",
      color: colors.labelSecondary,
      letterSpacing: "-0.23px",
    },
    actionBtn: (hover) => ({
      background: hover ? (darkMode ? "#0A6EDC" : "#0066CC") : colors.accent,
      color: "#FFFFFF",
      border: "none",
      borderRadius: "14px",
      padding: "12px 20px",
      fontSize: "15px",
      fontWeight: "600",
      cursor: "pointer",
      fontFamily: "inherit",
      letterSpacing: "-0.23px",
      transition: "all 0.2s ease",
      transform: hover ? "scale(0.98)" : "scale(1)",
      boxShadow: hover ? `0 4px 16px ${colors.accent}50` : `0 2px 8px ${colors.accent}30`,
      display: "flex",
      alignItems: "center",
      gap: "6px",
    }),
    sectionTitle: {
      fontSize: "20px",
      fontWeight: "700",
      color: colors.labelPrimary,
      letterSpacing: "-0.43px",
      margin: "0 0 16px 0",
    },
    infoCard: {
      background: colors.bgCard,
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: darkMode
        ? "0 2px 8px rgba(0,0,0,0.3)"
        : "0 2px 8px rgba(0,0,0,0.06)",
      marginBottom: "20px",
    },
    infoRow: (last) => ({
      padding: "14px 16px",
      borderBottom: last ? "none" : `0.5px solid ${colors.separator}`,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }),
    infoLabel: {
      fontSize: "15px",
      color: colors.labelSecondary,
      letterSpacing: "-0.23px",
    },
    infoValue: {
      fontSize: "15px",
      fontWeight: "600",
      color: colors.labelPrimary,
      letterSpacing: "-0.23px",
    },
  };

  // Determine which icon to show per category
  const getCategoryIcon = (cat) => {
    if (cat === "Social Ads") return "📱";
    if (cat === "Landing Page") return "🌐";
    if (cat === "Email") return "✉️";
    if (cat === "Search Ads") return "🔍";
    return "📦";
  };

  // ─── DASHBOARD VIEW ───────────────────────────────────────────────────────
  if (view === "dashboard") {
    const readyCount = products.filter((p) => p.status === "ready").length;
    const pendingCount = products.filter((p) => p.status === "pending").length;
    const totalAssets = products.reduce((a, b) => a + b.assets, 0);

    return (
      <div style={styles.dashRoot}>
        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
          @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
          * { box-sizing: border-box; }
          ::placeholder { color: ${colors.labelTertiary}; }
          ::-webkit-scrollbar { display: none; }
        `}</style>

        {/* Nav */}
        <nav style={styles.nav}>
          <div style={styles.navInner}>
            <div style={styles.navLogo}>
              <div style={styles.navLogoIcon}>🐄</div>
              <span style={styles.navBrand}>ClonePro</span>
            </div>
            <div style={styles.navActions}>
              <button
                style={styles.avatarBtn}
                onClick={() => setView("login")}
                title="Cerrar sesión"
              >
                ND
              </button>
            </div>
          </div>
        </nav>

        {/* Content */}
        <div style={styles.dashContent}>
          {/* Header */}
          <div style={{ ...styles.dashHeader, animation: "fadeUp 0.4s ease" }}>
            <h1 style={styles.dashTitle}>Panel de lanzamiento</h1>
            <p style={styles.dashSubtitle}>
              Gestiona tus productos y verifica cada activo antes de lanzar campañas.
            </p>
          </div>

          {/* Stats */}
          <div style={{ ...styles.statsGrid, animation: "fadeUp 0.5s ease" }}>
            {[
              { value: products.length, label: "Proyectos", icon: "📦" },
              { value: readyCount, label: "Listos", icon: "✅" },
              { value: pendingCount, label: "Pendientes", icon: "⏳" },
            ].map((s, i) => (
              <div key={i} style={styles.statCard(i)}>
                <div style={{ fontSize: "20px", marginBottom: "4px" }}>{s.icon}</div>
                <div style={styles.statValue}>{s.value}</div>
                <div style={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          {activeTab === "productos" && (
            <div style={{ animation: "fadeUp 0.6s ease" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <div style={styles.tabs}>
                  {["productos", "activos", "reportes"].map((t) => (
                    <button
                      key={t}
                      style={styles.tab(activeTab === t, hoveredTab === t)}
                      onClick={() => setActiveTab(t)}
                      onMouseEnter={() => setHoveredTab(t)}
                      onMouseLeave={() => setHoveredTab(null)}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
                <button
                  style={styles.actionBtn(hoveredAction === "new")}
                  onMouseEnter={() => setHoveredAction("new")}
                  onMouseLeave={() => setHoveredAction(null)}
                  // TODO: Abrir modal para crear nuevo proyecto
                  onClick={() => alert("Crear nuevo proyecto — próximamente.")}
                >
                  <span>＋</span>
                  <span>Nuevo</span>
                </button>
              </div>

              {/* Product List */}
              <div style={styles.productList}>
                {products.map((p, i) => {
                  const pct = Math.round((p.verified / p.assets) * 100);
                  return (
                    <div
                      key={p.id}
                      style={{
                        ...styles.productCard(hoveredProduct === p.id),
                        animation: `fadeUp ${0.3 + i * 0.07}s ease`,
                      }}
                      onMouseEnter={() => setHoveredProduct(p.id)}
                      onMouseLeave={() => setHoveredProduct(null)}
                      // TODO: Navegar al detalle del producto
                      onClick={() => alert(`Ver detalle de "${p.name}" — próximamente.`)}
                    >
                      <div style={styles.productLeft}>
                        <div style={styles.productIcon(p.status)}>
                          {getCategoryIcon(p.category)}
                        </div>
                        <div style={styles.productInfo}>
                          <p style={styles.productName}>{p.name}</p>
                          <p style={styles.productMeta}>
                            {p.category} · {p.verified}/{p.assets} activos verificados
                          </p>
                        </div>
                      </div>
                      <div style={styles.productRight}>
                        <span style={styles.statusBadge(p.status)}>
                          {getStatusLabel(p.status)}
                        </span>
                        <div style={styles.progressBar}>
                          <div style={styles.progressFill(pct, p.status)} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "activos" && (
            <div style={{ animation: "fadeUp 0.4s ease" }}>
              <div style={styles.tabs}>
                {["productos", "activos", "reportes"].map((t) => (
                  <button
                    key={t}
                    style={styles.tab(activeTab === t, hoveredTab === t)}
                    onClick={() => setActiveTab(t)}
                    onMouseEnter={() => setHoveredTab(t)}
                    onMouseLeave={() => setHoveredTab(null)}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
              <div style={styles.infoCard}>
                {[
                  { label: "Total de activos", value: totalAssets },
                  { label: "Activos verificados", value: products.reduce((a, b) => a + b.verified, 0) },
                  { label: "Tasa de verificación", value: `${Math.round((products.reduce((a, b) => a + b.verified, 0) / totalAssets) * 100)}%` },
                  { label: "Proyectos activos", value: products.length },
                ].map((row, i, arr) => (
                  <div key={i} style={styles.infoRow(i === arr.length - 1)}>
                    <span style={styles.infoLabel}>{row.label}</span>
                    <span style={styles.infoValue}>{row.value}</span>
                  </div>
                ))}
              </div>
              <div style={styles.emptyState}>
                <span style={styles.emptyIcon}>🗂️</span>
                <div style={styles.emptyTitle}>Gestión de activos</div>
                <p style={styles.emptyText}>
                  Aquí verás todos tus activos agrupados y su estado de verificación.
                </p>
                {/* TODO: Implementar lista detallada de activos */}
              </div>
            </div>
          )}

          {activeTab === "reportes" && (
            <div style={{ animation: "fadeUp 0.4s ease" }}>
              <div style={styles.tabs}>
                {["productos", "activos", "reportes"].map((t) => (
                  <button
                    key={t}
                    style={styles.tab(activeTab === t, hoveredTab === t)}
                    onClick={() => setActiveTab(t)}
                    onMouseEnter={() => setHoveredTab(t)}
                    onMouseLeave={() => setHoveredTab(null)}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
              <div style={styles.emptyState}>
                <span style={styles.emptyIcon}>📊</span>
                <div style={styles.emptyTitle}>Reportes próximamente</div>
                <p style={styles.emptyText}>
                  Aquí encontrarás métricas detalladas de tus campañas y lanzamientos.
                </p>
                {/* TODO: Implementar módulo de reportes y métricas */}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Tab Bar */}
        <div style={styles.bottomTab}>
          {[
            { id: "inicio", icon: "🏠", label: "Inicio" },
            { id: "productos", icon: "📦", label: "Proyectos" },
            { id: "activos", icon: "🗂️", label: "Activos" },
            { id: "perfil", icon: "👤", label: "Perfil" },
          ].map((tab) => (
            <button
              key={tab.id}
              style={styles.bottomTabBtn(activeTab === tab.id)}
              onClick={() => {
                if (tab.id === "perfil") {
                  // TODO: Implementar pantalla de perfil de usuario
                  alert("Perfil de usuario — próximamente.");
                } else {
                  setActiveTab(tab.id);
                }
              }}
            >
              <span style={styles.bottomTabIcon(activeTab === tab.id)}>{tab.icon}</span>
              <span style={styles.bottomTabLabel(activeTab === tab.id)}>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ─── LOGIN VIEW ───────────────────────────────────────────────────────────
  return (
    <main style={styles.root}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }
        * { box-sizing: border-box; }
        ::placeholder { color: ${colors.labelTertiary}; opacity: 1; }
        input:-webkit-autofill { -webkit-box-shadow: 0 0 0 1000px ${colors.inputBg} inset !important; -webkit-text-fill-color: ${colors.labelPrimary} !important; }
      `}</style>

      <div style={styles.fadeUp}>
        {/* Header */}
        <div style={styles.header}>
          <div style={{ ...styles.logo, display: "block", margin: "0 auto 20px" }}>
            🐄
          </div>
          <h1 style={styles.h1}>Inicia sesión</h1>
          <p style={styles.subtitle}>en tu cuenta de ClonePro</p>
        </div>

        {/* Error */}
        {error && (
          <div style={{ ...styles.errorBox, animation: "shake 0.4s ease" }}>
            ⚠️ {error}
          </div>
        )}

        {/* Form card */}
        <div style={styles.card}>
          <form onSubmit={handleLogin}>
            {/* Email */}
            <div
              style={{
                ...styles.fieldTop,
                borderBottom: `0.5px solid ${emailFocused ? colors.accent : colors.separator}`,
                transition: "border-color 0.2s",
              }}
            >
              <label htmlFor="email" style={styles.label}>
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                style={styles.input(emailFocused)}
                placeholder="correo@ejemplo.com"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
              />
            </div>

            {/* Password */}
            <div
              style={{
                ...styles.fieldBottom,
                borderBottom: `0.5px solid ${passFocused ? colors.accent : "transparent"}`,
                transition: "border-color 0.2s",
              }}
            >
              <label htmlFor="password" style={styles.label}>
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                style={styles.input(passFocused)}
                placeholder="Tu contraseña"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                onFocus={() => setPassFocused(true)}
                onBlur={() => setPassFocused(false)}
              />
            </div>
          </form>
        </div>

        {/* Hint */}
        <p style={{ fontSize: "13px", color: colors.labelTertiary, textAlign: "center", margin: "-8px 0 12px", letterSpacing: "-0.08px" }}>
          Demo: demo@clonepro.com / 123456
        </p>

        {/* Submit */}
        <button
          style={styles.btnPrimary(!isFormValid || loading, hoverBtn && isFormValid && !loading)}
          disabled={!isFormValid || loading}
          onMouseEnter={() => setHoverBtn(true)}
          onMouseLeave={() => setHoverBtn(false)}
          onClick={handleLogin}
        >
          {loading ? (
            <>
              <span style={styles.loadingSpinner} />
              Ingresando…
            </>
          ) : (
            "Ingresar →"
          )}
        </button>

        {/* Code login */}
        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <button
            style={styles.btnCode(hoverCode)}
            onMouseEnter={() => setHoverCode(true)}
            onMouseLeave={() => setHoverCode(false)}
            onClick={handleCodeLogin}
          >
            Usar código por correo
          </button>
        </div>

        {/* Register */}
        <p style={styles.footer}>
          ¿No tienes cuenta?{" "}
          <span
            style={styles.footerLink(hoverRegister)}
            onMouseEnter={() => setHoverRegister(true)}
            onMouseLeave={() => setHoverRegister(false)}
            // TODO: Conectar con pantalla de registro de nuevos usuarios
            onClick={() => alert("Registro de nueva cuenta — próximamente.")}
          >
            Regístrate
          </span>
        </p>

        {/* Footer brand */}
        <p style={{ textAlign: "center", marginTop: "32px", fontSize: "12px", color: colors.labelTertiary, letterSpacing: "-0.08px" }}>
          © 2024 Num Digital · ClonePro
        </p>
      </div>
    </main>
  );
}