import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  useTheme,
  Avatar,
  List,
  Button,
} from "react-native-paper";
import { Calendar, Truck, Package, Users, Bell } from "lucide-react-native";

const steps = [
  { title: "Recolección programada", icon: Calendar, date: "04/01/2021" },
  { title: "En camino para recolección", icon: Truck, date: "11/02/2022" },
  {
    title: "Alimentos recibidos en el banco",
    icon: Package,
    date: "21/03/2023",
  },
  { title: "Alimentos en distribución", icon: Users, date: "31/04/2024" },
];

function DonationTracking({ navigation }) {
  const theme = useTheme();
  const [currentStep, setCurrentStep] = React.useState(2);
  const [notifications, setNotifications] = React.useState([
    {
      title: "Recolección programada",
      message: "Tu donación será recogida mañana a las 10:00 AM.",
    },
    {
      title: "En camino",
      message: "El equipo de recolección está en camino a tu ubicación.",
    },
  ]);

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Seguimiento de Donación</Title>

      <Card style={styles.timelineCard}>
        <Card.Content>
          <Title>Estado de la donación</Title>
          {steps.map((step, index) => (
            <View key={index} style={styles.timelineItem}>
              <View
                style={[
                  styles.timelineLeft,
                  index <= currentStep && styles.activeTimelineLeft,
                ]}
              >
                <Avatar.Icon
                  size={40}
                  icon={() => (
                    <step.icon
                      color={
                        index <= currentStep ? "white" : theme.colors.surface
                      }
                    />
                  )}
                  style={[
                    styles.timelineIcon,
                    index <= currentStep && styles.activeTimelineIcon,
                  ]}
                />
                {index < steps.length - 1 && (
                  <View
                    style={[
                      styles.timelineLine,
                      index < currentStep && styles.activeTimelineLine,
                    ]}
                  />
                )}
              </View>
              <View style={styles.timelineContent}>
                <Paragraph
                  style={[
                    styles.timelineTitle,
                    index <= currentStep && styles.activeTimelineTitle,
                  ]}
                >
                  {step.title}
                </Paragraph>
                <Paragraph style={styles.timelineDate}>{step.date}</Paragraph>
              </View>
            </View>
          ))}
        </Card.Content>
      </Card>

      <Card style={styles.notificationsCard}>
        <Card.Content>
          <Title>Notificaciones</Title>
          <List.Section>
            {notifications.map((notification, index) => (
              <List.Item
                key={index}
                title={notification.title}
                description={notification.message}
                left={() => <Bell size={24} color={"#e02e2e"} />}
              />
            ))}
          </List.Section>
        </Card.Content>
      </Card>

      <View style={{ alignItems: "center" }}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          Volver al Inicio
        </Button>
      </View>
    </ScrollView>
  );
}

export default DonationTracking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  timelineCard: {
    marginBottom: 16,
    backgroundColor: "#ececec",
  },
  timelineItem: {
    flexDirection: "row",
    marginBottom: 20,
  },
  timelineLeft: {
    alignItems: "center",
    marginRight: 15,
  },
  activeTimelineLeft: {
    // No additional styles needed, kept for clarity
  },
  timelineIcon: {
    backgroundColor: "#e0e0e0",
  },
  activeTimelineIcon: {
    backgroundColor: "#e02e2e",
  },
  timelineLine: {
    position: "absolute",
    top: 40,
    left: 20,
    bottom: -20,
    width: 2,
    backgroundColor: "#e0e0e0",
  },
  activeTimelineLine: {
    backgroundColor: "#a00906",
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontWeight: "bold",
    color: "#757575",
  },
  activeTimelineTitle: {
    color: "#000000",
  },
  timelineDate: {
    color: "#9e9e9e",
  },
  notificationsCard: {
    marginBottom: 16,
    backgroundColor: "#ececec",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#e02e2e",
    borderRadius: 30,
    elevation: 3,
  },
});
