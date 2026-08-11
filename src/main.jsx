import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import {
  HeartPulse,
  LayoutDashboard,
  Users,
  CalendarDays,
  Utensils,
  ClipboardList,
  MessageCircle,
  Settings,
  LogOut,
  Search,
  Plus,
  ChevronRight,
  TrendingDown,
  Activity,
  Menu,
  X,
  CheckCircle2,
  ArrowUpRight,
  FileText,
  BarChart3,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

import {
  Alert,
  AppBar,
  Avatar,
  Box,
  Button,
  Card as MuiCard,
  CardContent,
  CardHeader,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

/* =========================================================
   TEMA
========================================================= */

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#315C4A",
      light: "#4F8069",
      dark: "#244638",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#E8B86D",
    },

    background: {
      default: "#F6F8F6",
      paper: "#FFFFFF",
    },

    success: {
      main: "#4D8B6D",
    },

    warning: {
      main: "#D99A3D",
    },

    error: {
      main: "#C85C5C",
    },

    text: {
      primary: "#26332D",
      secondary: "#718078",
    },

    divider: "#E5EAE7",
  },

  typography: {
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      "Arial",
      "sans-serif",
    ].join(","),

    h1: {
      fontWeight: 700,
    },

    h2: {
      fontWeight: 700,
    },

    h3: {
      fontWeight: 700,
    },

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 700,
    },

    h6: {
      fontWeight: 700,
    },
  },

  shape: {
    borderRadius: 14,
  },

  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },

      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 10,
          fontWeight: 600,
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: "1px solid #E5EAE7",
          boxShadow: "0 4px 18px rgba(35, 58, 46, 0.05)",
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

/* =========================================================
   DADOS
========================================================= */

const patients = [
  {
    id: 1,
    name: "Mariana Souza",
    age: 34,
    goal: "Emagrecimento",
    weight: 78.4,
    start: 84.2,
    progress: 68,
    last: "08/08/2026",
    status: "Ativa",
    avatar: "MS",
  },
  {
    id: 2,
    name: "Carlos Mendes",
    age: 41,
    goal: "Hipertrofia",
    weight: 82.1,
    start: 79.6,
    progress: 82,
    last: "07/08/2026",
    status: "Ativa",
    avatar: "CM",
  },
  {
    id: 3,
    name: "Juliana Costa",
    age: 29,
    goal: "Reeducação alimentar",
    weight: 66.8,
    start: 69.4,
    progress: 54,
    last: "05/08/2026",
    status: "Ativa",
    avatar: "JC",
  },
  {
    id: 4,
    name: "Rafael Lima",
    age: 38,
    goal: "Performance",
    weight: 91.3,
    start: 92.0,
    progress: 43,
    last: "31/07/2026",
    status: "Atenção",
    avatar: "RL",
  },
  {
    id: 5,
    name: "Fernanda Alves",
    age: 47,
    goal: "Emagrecimento",
    weight: 73.5,
    start: 80.1,
    progress: 76,
    last: "30/07/2026",
    status: "Ativa",
    avatar: "FA",
  },
];

const weightData = [
  { d: "01/07", v: 84.2 },
  { d: "08/07", v: 83.1 },
  { d: "15/07", v: 81.9 },
  { d: "22/07", v: 80.8 },
  { d: "29/07", v: 79.5 },
  { d: "05/08", v: 78.4 },
];

const adherence = [
  { d: "Seg", v: 88 },
  { d: "Ter", v: 92 },
  { d: "Qua", v: 74 },
  { d: "Qui", v: 96 },
  { d: "Sex", v: 83 },
  { d: "Sáb", v: 70 },
  { d: "Dom", v: 86 },
];

/* =========================================================
   CONSTANTES
========================================================= */

const DRAWER_WIDTH = 260;

/* =========================================================
   APP
========================================================= */

function App() {
  const theme = useTheme();

  const isMobile = useMediaQuery(
    theme.breakpoints.down("md")
  );

  const [page, setPage] = useState("dashboard");
  const [mobile, setMobile] = useState(false);
  const [selected, setSelected] = useState(null);

  const nav = (p) => {
    setPage(p);
    setMobile(false);
  };

  const pageTitle = {
    dashboard: "Bom dia, Paula 👋",
    patients: "Pacientes",
    agenda: "Agenda",
    plans: "Planos alimentares",
    records: "Evoluções",
    messages: "Mensagens",
    settings: "Configurações",
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobile : true}
        onClose={() => setMobile(false)}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            borderRight: "1px solid",
            borderColor: "divider",
            bgcolor: "#FFFFFF",
          },
        }}
      >
        <Sidebar
          page={page}
          nav={nav}
          close={() => setMobile(false)}
          isMobile={isMobile}
        />
      </Drawer>

      <Box
        component="main"
        sx={{
          ml: isMobile ? 0 : `${DRAWER_WIDTH}px`,
          minHeight: "100vh",
        }}
      >
        <AppBar
          position="sticky"
          elevation={0}
          color="inherit"
          sx={{
            bgcolor: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Toolbar
            sx={{
              minHeight: "78px !important",
              px: {
                xs: 2,
                md: 4,
              },
              gap: 2,
            }}
          >
            {isMobile && (
              <IconButton
                onClick={() => setMobile(true)}
                sx={{
                  color: "text.primary",
                }}
              >
                <Menu />
              </IconButton>
            )}

            <Box sx={{ flex: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  fontWeight: 700,
                  letterSpacing: 1.2,
                }}
              >
                TERÇA-FEIRA, 11 DE AGOSTO
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  mt: 0.25,
                  fontWeight: 700,
                }}
              >
                {pageTitle[page]}
              </Typography>
            </Box>

            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
            >
              {!isMobile && (
                <TextField
                  placeholder="Buscar paciente..."
                  sx={{
                    width: 260,

                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      bgcolor: "#F7F9F7",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search size={18} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}

              <IconButton
                sx={{
                  bgcolor: "#F1F5F2",
                  position: "relative",
                }}
              >
                <MessageCircle size={19} />

                <Box
                  sx={{
                    position: "absolute",
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    bgcolor: "error.main",
                    top: 7,
                    right: 7,
                    border: "2px solid white",
                  }}
                />
              </IconButton>

              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  width: 38,
                  height: 38,
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                PC
              </Avatar>
            </Stack>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            p: {
              xs: 2,
              sm: 3,
              md: 4,
            },
          }}
        >
          {page === "dashboard" && (
            <Dashboard
              nav={nav}
              setSelected={setSelected}
            />
          )}

          {page === "patients" && (
            <Patients
              setSelected={setSelected}
            />
          )}

          {page === "agenda" && <Agenda />}

          {page === "plans" && <Plans />}

          {page === "records" && <Records />}

          {page === "messages" && <Messages />}

          {page === "settings" && <SettingsPage />}

          {selected && (
            <PatientModal
              patient={selected}
              close={() => setSelected(null)}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}

/* =========================================================
   SIDEBAR
========================================================= */

function Sidebar({
  page,
  nav,
  close,
  isMobile,
}) {
  const menuItems = [
    ["dashboard", "Dashboard", LayoutDashboard],
    ["patients", "Pacientes", Users],
    ["agenda", "Agenda", CalendarDays],
    ["plans", "Planos alimentares", Utensils],
    ["records", "Evoluções", ClipboardList],
    ["messages", "Mensagens", MessageCircle],
  ];

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          px: 2.5,
          py: 2.5,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: 2.5,
            bgcolor: "primary.main",
            color: "white",
            display: "grid",
            placeItems: "center",
          }}
        >
          <HeartPulse size={21} />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography
            fontWeight={800}
            lineHeight={1}
          >
            NutriFlow
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
          >
            gestão nutricional
          </Typography>
        </Box>

        {isMobile && (
          <IconButton onClick={close}>
            <X size={20} />
          </IconButton>
        )}
      </Box>

      <Box
        sx={{
          mx: 2,
          mb: 2,
          p: 1.5,
          borderRadius: 3,
          bgcolor: "#F5F8F5",
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Avatar
          sx={{
            bgcolor: "primary.main",
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          PC
        </Avatar>

        <Box>
          <Typography
            variant="body2"
            fontWeight={700}
          >
            Dra. Paula Campos
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
          >
            Nutricionista
          </Typography>
        </Box>
      </Box>

      <List
        sx={{
          px: 1.5,
        }}
      >
        {menuItems.map(
          ([id, label, Icon]) => (
            <ListItemButton
              key={id}
              selected={page === id}
              onClick={() => nav(id)}
              sx={{
                borderRadius: 2.5,
                mb: 0.5,
                minHeight: 46,

                "&.Mui-selected": {
                  bgcolor: "rgba(49,92,74,0.10)",
                  color: "primary.main",

                  "& .MuiListItemIcon-root": {
                    color: "primary.main",
                  },
                },

                "&:hover": {
                  bgcolor: "rgba(49,92,74,0.06)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 38,
                  color:
                    page === id
                      ? "primary.main"
                      : "text.secondary",
                }}
              >
                <Icon size={19} />
              </ListItemIcon>

              <ListItemText
                primary={label}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight:
                    page === id
                      ? 700
                      : 500,
                }}
              />
            </ListItemButton>
          )
        )}
      </List>

      <Box sx={{ mt: "auto", p: 1.5 }}>
        <Divider sx={{ mb: 1 }} />

        <ListItemButton
          onClick={() => nav("settings")}
          sx={{
            borderRadius: 2.5,
          }}
        >
          <ListItemIcon sx={{ minWidth: 38 }}>
            <Settings size={19} />
          </ListItemIcon>

          <ListItemText primary="Configurações" />
        </ListItemButton>

        <ListItemButton
          sx={{
            borderRadius: 2.5,
          }}
        >
          <ListItemIcon sx={{ minWidth: 38 }}>
            <LogOut size={19} />
          </ListItemIcon>

          <ListItemText primary="Sair" />
        </ListItemButton>
      </Box>
    </Box>
  );
}

/* =========================================================
   DASHBOARD
========================================================= */

function Dashboard({
  nav,
  setSelected,
}) {
  return (
    <Stack spacing={3}>
      <Paper
        elevation={0}
        sx={{
          p: {
            xs: 3,
            md: 4,
          },
          borderRadius: 4,
          bgcolor: "primary.main",
          color: "white",
          overflow: "hidden",
          position: "relative",
          minHeight: 230,
        }}
      >
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            maxWidth: 620,
          }}
        >
          <Chip
            label="VISÃO GERAL"
            size="small"
            sx={{
              bgcolor: "rgba(255,255,255,0.15)",
              color: "white",
              fontWeight: 700,
              mb: 2,
            }}
          />

          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              mb: 1,
            }}
          >
            Sua clínica em um só lugar.
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.78)",
              maxWidth: 520,
              mb: 3,
            }}
          >
            Acompanhe pacientes, consultas e
            evolução nutricional com clareza.
          </Typography>

          <Button
            variant="contained"
            startIcon={<Plus size={18} />}
            onClick={() => nav("patients")}
            sx={{
              bgcolor: "white",
              color: "primary.main",

              "&:hover": {
                bgcolor: "#F1F5F2",
              },
            }}
          >
            Novo paciente
          </Button>
        </Box>

        <Box
          sx={{
            position: "absolute",
            right: {
              xs: -80,
              md: 50,
            },
            top: 25,
            width: 230,
            height: 230,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.18)",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Box
            sx={{
              width: 150,
              height: 150,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.20)",
              display: "grid",
              placeItems: "center",
            }}
          >
            <HeartPulse size={55} />
          </Box>
        </Box>

        <Chip
          label="+12 consultas"
          sx={{
            position: "absolute",
            right: {
              xs: 20,
              md: 210,
            },
            top: 35,
            bgcolor: "white",
            color: "primary.main",
            fontWeight: 700,
          }}
        />

        <Chip
          label="94% de adesão"
          sx={{
            position: "absolute",
            right: {
              xs: 15,
              md: 110,
            },
            bottom: 30,
            bgcolor: "rgba(255,255,255,0.14)",
            color: "white",
          }}
        />
      </Paper>

      <Grid
        container
        spacing={2}
      >
        <Grid item xs={12} sm={6} md={3}>
          <Stat
            icon={Users}
            label="Pacientes ativos"
            value="128"
            trend="+8,4%"
            up
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Stat
            icon={CalendarDays}
            label="Consultas hoje"
            value="7"
            trend="2 pendentes"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Stat
            icon={TrendingDown}
            label="Peso médio"
            value="74,8 kg"
            trend="−1,8 kg"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Stat
            icon={Activity}
            label="Adesão média"
            value="87%"
            trend="+5,2%"
            up
          />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
      >
        <Grid item xs={12} md={6}>
          <Card
            title="Evolução de peso"
            action="Ver relatório"
          >
            <Box sx={{ height: 245 }}>
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <AreaChart data={weightData}>
                  <defs>
                    <linearGradient
                      id="weightGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopOpacity={0.22}
                      />

                      <stop
                        offset="95%"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E8ECE9"
                  />

                  <XAxis
                    dataKey="d"
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    domain={[76, 86]}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke="#315C4A"
                    strokeWidth={3}
                    fill="url(#weightGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            title="Adesão semanal"
            action="Detalhes"
          >
            <Box sx={{ height: 245 }}>
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <BarChart data={adherence}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E8ECE9"
                  />

                  <XAxis
                    dataKey="d"
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    domain={[0, 100]}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip />

                  <Bar
                    dataKey="v"
                    fill="#315C4A"
                    radius={[7, 7, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
      >
        <Grid item xs={12} md={6}>
          <Card title="Próximas consultas">
            <Stack spacing={1}>
              {patients
                .slice(0, 4)
                .map((p, i) => (
                  <Box
                    key={p.id}
                    sx={{
                      p: 1.5,
                      borderRadius: 2.5,
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      "&:hover": {
                        bgcolor: "#F6F8F6",
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "#E6EFEA",
                        color: "primary.main",
                        fontSize: 13,
                        fontWeight: 700,
                      }}
                    >
                      {p.avatar}
                    </Avatar>

                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="body2"
                        fontWeight={700}
                      >
                        {p.name}
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        {p.goal}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        textAlign: "right",
                      }}
                    >
                      <Typography
                        variant="body2"
                        fontWeight={700}
                      >
                        {
                          [
                            "09:00",
                            "10:30",
                            "14:00",
                            "16:30",
                          ][i]
                        }
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        Hoje
                      </Typography>
                    </Box>

                    <ChevronRight
                      size={17}
                      color="#718078"
                    />
                  </Box>
                ))}
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card title="Pacientes que precisam de atenção">
            <Stack spacing={1.5}>
              {patients
                .filter(
                  (p) => p.status === "Atenção"
                )
                .map((p) => (
                  <Box
                    key={p.id}
                    sx={{
                      p: 1.5,
                      bgcolor: "#FFF8EC",
                      borderRadius: 2.5,
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        bgcolor: "#F5DCA9",
                        color: "#9A681C",
                        display: "grid",
                        placeItems: "center",
                        fontWeight: 800,
                      }}
                    >
                      !
                    </Box>

                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="body2"
                        fontWeight={700}
                      >
                        {p.name}
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        Adesão abaixo da meta nesta
                        semana
                      </Typography>
                    </Box>

                    <Button
                      size="small"
                      endIcon={
                        <ArrowUpRight size={15} />
                      }
                      onClick={() =>
                        setSelected(p)
                      }
                    >
                      Ver perfil
                    </Button>
                  </Box>
                ))}

              <Alert
                severity="success"
                icon={
                  <CheckCircle2 size={19} />
                }
                sx={{
                  borderRadius: 2.5,
                }}
              >
                Todos os demais pacientes estão
                dentro do esperado.
              </Alert>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}

/* =========================================================
   STAT
========================================================= */

function Stat({
  icon: Icon,
  label,
  value,
  trend,
  up,
}) {
  return (
    <MuiCard
      sx={{
        height: "100%",
      }}
    >
      <CardContent>
        <Stack spacing={1}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              bgcolor: "#EAF1ED",
              color: "primary.main",
              display: "grid",
              placeItems: "center",
              mb: 0.5,
            }}
          >
            <Icon size={20} />
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            {label}
          </Typography>

          <Typography
            variant="h5"
            fontWeight={800}
          >
            {value}
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: up
                ? "success.main"
                : "text.secondary",
              fontWeight: up ? 700 : 500,
            }}
          >
            {trend}
          </Typography>
        </Stack>
      </CardContent>
    </MuiCard>
  );
}

/* =========================================================
   CARD
========================================================= */

function Card({
  title,
  action,
  children,
}) {
  return (
    <MuiCard
      sx={{
        height: "100%",
      }}
    >
      <CardHeader
        title={
          <Typography
            variant="h6"
            fontSize={16}
            fontWeight={700}
          >
            {title}
          </Typography>
        }
        action={
          action && (
            <Button
              size="small"
              endIcon={
                <ChevronRight size={15} />
              }
            >
              {action}
            </Button>
          )
        }
        sx={{
          pb: 1,
        }}
      />

      <CardContent
        sx={{
          pt: 0,
        }}
      >
        {children}
      </CardContent>
    </MuiCard>
  );
}

/* =========================================================
   PATIENTS
========================================================= */

function Patients({
  setSelected,
}) {
  const [q, setQ] = useState("");

  const filtered = patients.filter((p) =>
    p.name
      .toLowerCase()
      .includes(q.toLowerCase())
  );

  return (
    <Stack spacing={3}>
      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        spacing={2}
        justifyContent="space-between"
      >
        <TextField
          value={q}
          onChange={(e) =>
            setQ(e.target.value)
          }
          placeholder="Buscar por nome..."
          sx={{
            width: {
              xs: "100%",
              sm: 340,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={18} />
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          startIcon={<Plus size={18} />}
        >
          Novo paciente
        </Button>
      </Stack>

      <MuiCard>
        <CardContent>
          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={2}
            justifyContent="space-between"
            alignItems={{
              xs: "flex-start",
              sm: "center",
            }}
            mb={2}
          >
            <Box>
              <Typography
                variant="h6"
                fontWeight={700}
              >
                Todos os pacientes
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                {filtered.length} pacientes
                encontrados
              </Typography>
            </Box>

            <FormControl
              size="small"
              sx={{
                minWidth: 160,
              }}
            >
              <Select
                defaultValue="all"
              >
                <MenuItem value="all">
                  Todos os status
                </MenuItem>

                <MenuItem value="active">
                  Ativa
                </MenuItem>

                <MenuItem value="attention">
                  Atenção
                </MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Paciente
                  </TableCell>

                  <TableCell>
                    Objetivo
                  </TableCell>

                  <TableCell>
                    Peso atual
                  </TableCell>

                  <TableCell>
                    Adesão
                  </TableCell>

                  <TableCell>
                    Última consulta
                  </TableCell>

                  <TableCell>
                    Status
                  </TableCell>

                  <TableCell />
                </TableRow>
              </TableHead>

              <TableBody>
                {filtered.map((p) => (
                  <TableRow
                    key={p.id}
                    hover
                  >
                    <TableCell>
                      <Stack
                        direction="row"
                        spacing={1.5}
                        alignItems="center"
                      >
                        <Avatar
                          sx={{
                            bgcolor:
                              "#E6EFEA",
                            color:
                              "primary.main",
                            fontSize: 13,
                            fontWeight: 700,
                          }}
                        >
                          {p.avatar}
                        </Avatar>

                        <Box>
                          <Typography
                            variant="body2"
                            fontWeight={700}
                          >
                            {p.name}
                          </Typography>

                          <Typography
                            variant="caption"
                            color="text.secondary"
                          >
                            {p.age} anos
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      {p.goal}
                    </TableCell>

                    <TableCell>
                      <Typography
                        variant="body2"
                        fontWeight={700}
                      >
                        {p.weight} kg
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        início {p.start} kg
                      </Typography>
                    </TableCell>

                    <TableCell
                      sx={{
                        minWidth: 130,
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                      >
                        <LinearProgress
                          variant="determinate"
                          value={p.progress}
                          sx={{
                            flex: 1,
                            height: 7,
                            borderRadius: 10,
                            bgcolor:
                              "#E8EEEA",

                            "& .MuiLinearProgress-bar":
                              {
                                borderRadius: 10,
                                bgcolor:
                                  "primary.main",
                              },
                          }}
                        />

                        <Typography
                          variant="caption"
                          fontWeight={700}
                        >
                          {p.progress}%
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      {p.last}
                    </TableCell>

                    <TableCell>
                      <Chip
                        size="small"
                        label={p.status}
                        color={
                          p.status === "Ativa"
                            ? "success"
                            : "warning"
                        }
                        variant="outlined"
                      />
                    </TableCell>

                    <TableCell>
                      <Button
                        size="small"
                        endIcon={
                          <ArrowUpRight
                            size={15}
                          />
                        }
                        onClick={() =>
                          setSelected(p)
                        }
                      >
                        Abrir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </MuiCard>
    </Stack>
  );
}

/* =========================================================
   AGENDA
========================================================= */

function Agenda() {
  const times = [
    "09:00",
    "10:30",
    "11:30",
    "14:00",
    "15:00",
    "16:30",
    "18:00",
  ];

  const types = [
    "Avaliação inicial",
    "Retorno",
    "Bioimpedância",
    "Retorno",
    "Avaliação inicial",
    "Retorno",
    "Teleconsulta",
  ];

  return (
    <Stack spacing={3}>
      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        spacing={2}
        justifyContent="space-between"
      >
        <Box>
          <Typography
            variant="h5"
            fontWeight={800}
          >
            11 de agosto
          </Typography>

          <Typography
            color="text.secondary"
          >
            7 consultas agendadas
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Plus size={18} />}
        >
          Agendar consulta
        </Button>
      </Stack>

      <MuiCard>
        <CardContent>
          <Stack spacing={0}>
            {times.map((time, i) => {
              const patient =
                patients[
                  i % patients.length
                ];

              return (
                <Box
                  key={time}
                  sx={{
                    display: "flex",
                    gap: 2,
                    py: 1.5,
                    borderBottom:
                      i !== times.length - 1
                        ? "1px solid"
                        : "none",
                    borderColor:
                      "divider",
                  }}
                >
                  <Typography
                    sx={{
                      width: 55,
                      pt: 1.5,
                      fontWeight: 700,
                      fontSize: 14,
                    }}
                  >
                    {time}
                  </Typography>

                  <Box
                    sx={{
                      width: 2,
                      bgcolor:
                        "primary.main",
                      borderRadius: 5,
                    }}
                  />

                  <Paper
                    elevation={0}
                    sx={{
                      flex: 1,
                      p: 1.5,
                      borderRadius: 3,
                      bgcolor: "#F6F8F6",
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor:
                          "#E6EFEA",
                        color:
                          "primary.main",
                        fontSize: 13,
                        fontWeight: 700,
                      }}
                    >
                      {patient.avatar}
                    </Avatar>

                    <Box sx={{ flex: 1 }}>
                      <Typography
                        fontWeight={700}
                      >
                        {patient.name}
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        {types[i]}
                      </Typography>
                    </Box>

                    <Chip
                      size="small"
                      label={
                        i % 2
                          ? "Online"
                          : "Presencial"
                      }
                      variant="outlined"
                    />
                  </Paper>
                </Box>
              );
            })}
          </Stack>
        </CardContent>
      </MuiCard>
    </Stack>
  );
}

/* =========================================================
   PLANOS
========================================================= */

function Plans() {
  const plans = [
    [
      "Emagrecimento equilibrado",
      "1.650 kcal",
      "Proteína 125g",
      "24 refeições",
      "Atualizado hoje",
    ],
    [
      "Hipertrofia — iniciante",
      "2.450 kcal",
      "Proteína 170g",
      "28 refeições",
      "Atualizado ontem",
    ],
    [
      "Reeducação alimentar",
      "1.850 kcal",
      "Proteína 110g",
      "21 refeições",
      "Atualizado 05/08",
    ],
  ];

  return (
    <Stack spacing={3}>
      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        spacing={2}
        justifyContent="space-between"
      >
        <Box>
          <Typography
            variant="h5"
            fontWeight={800}
          >
            Planos alimentares
          </Typography>

          <Typography color="text.secondary">
            Modelos e prescrições personalizadas
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Plus size={18} />}
        >
          Criar plano
        </Button>
      </Stack>

      <Grid
        container
        spacing={2}
      >
        {plans.map((plan) => (
          <Grid
            item
            xs={12}
            sm={6}
            lg={4}
            key={plan[0]}
          >
            <MuiCard
              sx={{
                height: "100%",
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: 2.5,
                        bgcolor:
                          "#EAF1ED",
                        color:
                          "primary.main",
                        display: "grid",
                        placeItems:
                          "center",
                      }}
                    >
                      <Utensils
                        size={22}
                      />
                    </Box>

                    <IconButton size="small">
                      <Typography
                        fontWeight={800}
                      >
                        •••
                      </Typography>
                    </IconButton>
                  </Stack>

                  <Box>
                    <Typography
                      variant="h6"
                      fontWeight={800}
                    >
                      {plan[0]}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mt: 1,
                      }}
                    >
                      Plano completo com
                      refeições,
                      substituições e
                      orientações práticas.
                    </Typography>
                  </Box>

                  <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                  >
                    <Chip
                      size="small"
                      label={plan[1]}
                    />

                    <Chip
                      size="small"
                      label={plan[2]}
                    />
                  </Stack>

                  <Divider />

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                  >
                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      {plan[3]}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      {plan[4]}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </MuiCard>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}

/* =========================================================
   RECORDS
========================================================= */

function Records() {
  return (
    <Stack spacing={3}>
      <Grid
        container
        spacing={2}
      >
        <Grid item xs={12} sm={6} md={3}>
          <Stat
            icon={TrendingDown}
            label="Kg eliminados"
            value="184 kg"
            trend="nos últimos 30 dias"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Stat
            icon={Users}
            label="Avaliações"
            value="86"
            trend="+14% no mês"
            up
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Stat
            icon={BarChart3}
            label="Evoluções registradas"
            value="312"
            trend="+31 este mês"
            up
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Stat
            icon={Activity}
            label="Meta atingida"
            value="72%"
            trend="dos pacientes"
            up
          />
        </Grid>
      </Grid>

      <Card title="Resumo de evolução dos pacientes">
        <Stack spacing={1}>
          {patients.map((p) => (
            <Box
              key={p.id}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 1.5,
                borderRadius: 2.5,

                "&:hover": {
                  bgcolor: "#F6F8F6",
                },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "#E6EFEA",
                  color: "primary.main",
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                {p.avatar}
              </Avatar>

              <Box
                sx={{
                  flex: 1,
                  minWidth: 120,
                }}
              >
                <Typography
                  variant="body2"
                  fontWeight={700}
                >
                  {p.name}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  {p.goal}
                </Typography>
              </Box>

              <Box
                sx={{
                  textAlign: "right",
                }}
              >
                <Typography
                  variant="body2"
                  fontWeight={800}
                >
                  {(p.start - p.weight).toFixed(
                    1
                  )}{" "}
                  kg
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  evolução
                </Typography>
              </Box>

              <Box
                sx={{
                  width: {
                    xs: 80,
                    sm: 160,
                  },
                }}
              >
                <LinearProgress
                  variant="determinate"
                  value={p.progress}
                  sx={{
                    height: 7,
                    borderRadius: 10,
                    bgcolor: "#E8EEEA",

                    "& .MuiLinearProgress-bar":
                      {
                        bgcolor:
                          "primary.main",
                        borderRadius: 10,
                      },
                  }}
                />
              </Box>

              <Button
                size="small"
                endIcon={
                  <ChevronRight size={15} />
                }
              >
                Detalhes
              </Button>
            </Box>
          ))}
        </Stack>
      </Card>
    </Stack>
  );
}

/* =========================================================
   MESSAGES
========================================================= */

function Messages() {
  const messagePreview = [
    "Dra., consegui seguir o plano...",
    "Obrigada pelas orientações!",
    "Posso trocar o lanche?",
    "Enviei minha evolução.",
    "Bom dia, doutora!",
  ];

  const messageDate = [
    "09:42",
    "ontem",
    "05/08",
    "04/08",
    "02/08",
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        minHeight: 600,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        overflow: "hidden",
        display: "flex",
      }}
    >
      <Box
        sx={{
          width: {
            xs: 110,
            sm: 300,
          },
          borderRight: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box
          sx={{
            p: 2,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography
            fontWeight={800}
          >
            Conversas
          </Typography>
        </Box>

        <List disablePadding>
          {patients.map((p, i) => (
            <ListItemButton
              key={p.id}
              selected={i === 0}
              sx={{
                py: 1.5,
                gap: 1,
                alignItems: "flex-start",
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "#E6EFEA",
                  color: "primary.main",
                  width: 38,
                  height: 38,
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                {p.avatar}
              </Avatar>

              <Box
                sx={{
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <Typography
                  variant="body2"
                  fontWeight={700}
                  noWrap
                >
                  {p.name}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  noWrap
                  display="block"
                >
                  {messagePreview[i]}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  {messageDate[i]}
                </Typography>
              </Box>
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <Box
          sx={{
            p: 2,
            borderBottom: "1px solid",
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Avatar
            sx={{
              bgcolor: "#E6EFEA",
              color: "primary.main",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            MS
          </Avatar>

          <Box>
            <Typography
              fontWeight={700}
            >
              Mariana Souza
            </Typography>

            <Typography
              variant="caption"
              color="success.main"
            >
              Online agora
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            flex: 1,
            p: 3,
            bgcolor: "#F7F9F7",
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          <MessageBubble>
            Bom dia, Dra. Paula! Consegui seguir o
            plano alimentar quase todos os dias. 😊
          </MessageBubble>

          <MessageBubble me>
            Que ótimo, Mariana! Vi sua evolução e
            você está indo muito bem. Vamos manter
            o foco nesta semana.
          </MessageBubble>

          <MessageBubble>
            Posso substituir o iogurte do lanche por
            uma opção sem lactose?
          </MessageBubble>
        </Box>

        <Box
          sx={{
            p: 1.5,
            display: "flex",
            gap: 1,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <TextField
            fullWidth
            placeholder="Digite uma mensagem..."
          />

          <IconButton
            sx={{
              bgcolor: "primary.main",
              color: "white",
              borderRadius: 2,

              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
          >
            <MessageCircle size={17} />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
}

function MessageBubble({
  children,
  me = false,
}) {
  return (
    <Box
      sx={{
        alignSelf: me
          ? "flex-end"
          : "flex-start",

        maxWidth: {
          xs: "90%",
          sm: "70%",
        },

        p: 1.5,
        borderRadius: 3,

        bgcolor: me
          ? "primary.main"
          : "white",

        color: me
          ? "white"
          : "text.primary",

        boxShadow: me
          ? "none"
          : "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <Typography
        variant="body2"
      >
        {children}
      </Typography>
    </Box>
  );
}

/* =========================================================
   SETTINGS
========================================================= */

function SettingsPage() {
  const settings = [
    [
      "Dados profissionais",
      "Nome, CRN, especialidades e informações da clínica",
    ],
    [
      "Notificações",
      "Lembretes de consultas, mensagens e alertas de pacientes",
    ],
    [
      "Aparência",
      "Preferências visuais e modo de exibição",
    ],
    [
      "Privacidade",
      "Controle de acesso e segurança dos dados",
    ],
  ];

  return (
    <MuiCard>
      <CardContent>
        <Stack spacing={0}>
          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={2}
            alignItems={{
              xs: "flex-start",
              sm: "center",
            }}
            sx={{
              pb: 3,
            }}
          >
            <Avatar
              sx={{
                width: 64,
                height: 64,
                bgcolor: "primary.main",
                fontWeight: 700,
              }}
            >
              PC
            </Avatar>

            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h5"
                fontWeight={800}
              >
                Dra. Paula Campos
              </Typography>

              <Typography color="text.secondary">
                Nutricionista • CRN 00000
              </Typography>
            </Box>

            <Button variant="outlined">
              Editar perfil
            </Button>
          </Stack>

          <Divider />

          {settings.map(
            ([title, description]) => (
              <ListItemButton
                key={title}
                sx={{
                  py: 2,
                  px: 0,
                  borderBottom:
                    "1px solid",
                  borderColor:
                    "divider",
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography
                    fontWeight={700}
                  >
                    {title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {description}
                  </Typography>
                </Box>

                <ChevronRight />
              </ListItemButton>
            )
          )}
        </Stack>
      </CardContent>
    </MuiCard>
  );
}

/* =========================================================
   PATIENT MODAL
========================================================= */

function PatientModal({
  patient,
  close,
}) {
  return (
    <Dialog
      open={Boolean(patient)}
      onClose={close}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle
        sx={{
          pb: 1,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.5}
        >
          <Avatar
            sx={{
              width: 52,
              height: 52,
              bgcolor: "primary.main",
              fontWeight: 700,
            }}
          >
            {patient.avatar}
          </Avatar>

          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              fontWeight={800}
            >
              {patient.name}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {patient.age} anos • {patient.goal}
            </Typography>
          </Box>

          <Chip
            label="Ativa"
            color="success"
            size="small"
          />
        </Stack>
      </DialogTitle>

      <DialogContent dividers>
        <Grid
          container
          spacing={2}
          sx={{
            mb: 3,
          }}
        >
          <Grid item xs={4}>
            <Paper
              elevation={0}
              sx={{
                p: 1.5,
                textAlign: "center",
                bgcolor: "#F6F8F6",
                borderRadius: 2.5,
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
              >
                Peso atual
              </Typography>

              <Typography
                fontWeight={800}
              >
                {patient.weight} kg
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Paper
              elevation={0}
              sx={{
                p: 1.5,
                textAlign: "center",
                bgcolor: "#F6F8F6",
                borderRadius: 2.5,
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
              >
                Inicial
              </Typography>

              <Typography
                fontWeight={800}
              >
                {patient.start} kg
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Paper
              elevation={0}
              sx={{
                p: 1.5,
                textAlign: "center",
                bgcolor: "#F6F8F6",
                borderRadius: 2.5,
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
              >
                Adesão
              </Typography>

              <Typography
                fontWeight={800}
              >
                {patient.progress}%
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Typography
          variant="h6"
          fontWeight={800}
          mb={1}
        >
          Resumo clínico
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          Dados demonstrativos para o projeto.
          Histórico, medidas corporais, exames e
          prescrições podem ser integrados nesta tela.
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          p: 2,
        }}
      >
        <Button
          variant="outlined"
          startIcon={<FileText size={17} />}
        >
          Ver prontuário
        </Button>

        <Button
          variant="contained"
          startIcon={
            <CalendarDays size={17} />
          }
        >
          Agendar retorno
        </Button>
      </DialogActions>
    </Dialog>
  );
}

/* =========================================================
   ROOT
========================================================= */

createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);