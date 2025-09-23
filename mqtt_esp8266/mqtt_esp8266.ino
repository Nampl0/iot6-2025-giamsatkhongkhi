#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>

#define DHTPIN D5
#define DHTTYPE DHT11
#define LIGHT_SENSOR_PIN A0

DHT_Unified dht(DHTPIN, DHTTYPE);

const char *ssid = "CSO";
const char *password = "88888888";
const char *mqtt_server = "172.20.10.5";
const char *mqtt_username = "iot"; 
const char *mqtt_password = "123"; 
const char *topic = "device/control";
WiFiClient espClient;
PubSubClient client(espClient);

unsigned long lastMsg = 0;
float temp, hum, light;

void setup_wifi() {
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(200);
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char *topic, byte *payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();

  if ((char)payload[0] == '0') {
    digitalWrite(D6, LOW);
    client.publish("Response_Light1", "Light 1 OFF");
  } else if ((char)payload[0] == '1') {
    digitalWrite(D6, HIGH);
    client.publish("Response_Light1", "Light 1 ON");
    digitalWrite(D7, HIGH);
    client.publish("Response_Light2"  , "Light 2 ON");
  } else if ((char)payload[0] == '2') {
    digitalWrite(D7, HIGH);
    client.publish("Response_Light2"  , "Light 2 ON");
  } else if ((char)payload[0] == '3') {
    digitalWrite(D7, LOW);
    client.publish("Response_Light2", "Light 2 OFF");
  }
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    if (client.connect(clientId.c_str(), mqtt_username, mqtt_password)) {
      Serial.println("connected");
      client.subscribe("device/led");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

void setup() {
  pinMode(D6, OUTPUT);
  pinMode(D7, OUTPUT);
  
  dht.begin();
  sensor_t sensor;
  dht.temperature().getSensor(&sensor);
  dht.humidity().getSensor(&sensor);

  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1701);
  client.setCallback(callback);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  unsigned long now = millis();
  if (now - lastMsg > 5000) {
    lastMsg = now;

    // Read temperature
    sensors_event_t event;
    dht.temperature().getEvent(&event);
    if (!isnan(event.temperature)) {
      Serial.print(F("Temperature: "));
      Serial.print(event.temperature);
      Serial.println(F(" °C"));
      temp = event.temperature;
    }

    // Read humidity
    dht.humidity().getEvent(&event);
    if (!isnan(event.relative_humidity)) {
      Serial.print(F("Humidity: "));
      Serial.print(event.relative_humidity);
      Serial.println(F(" %"));
      hum = event.relative_humidity;
    }

    // Read light intensity
    int lightValue = analogRead(LIGHT_SENSOR_PIN);
    //light = map(lightValue, 0, 1023, 0, 100);  
    light = lightValue;

    Serial.print("Light: ");
    Serial.print((int)light);
    Serial.println(F(" lux"));


    // Publish data to MQTT
    String msgStr =String(temp) + "," + String(hum) + "," + String((int)light);
    char msg[msgStr.length() + 1];
    msgStr.toCharArray(msg, sizeof(msg));
    client.publish(topic, msg);
    
    
    delay(50);
  }
}