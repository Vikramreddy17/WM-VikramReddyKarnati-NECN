/*
  Smart Waste Bin – ESP32 LoRaWAN Node
  Conceptual Firmware for IIIT Hyderabad Submission
*/

#include <Arduino.h>

// --- Pin Definitions ---
#define ULTRASONIC_TRIG 5
#define ULTRASONIC_ECHO 18
#define LOADCELL_DOUT 19
#define LOADCELL_SCK 21

// --- Thresholds ---
#define FILL_THRESHOLD 80     // %
#define WEIGHT_THRESHOLD 7.0  // kg

// --- Dummy values for conceptual demo ---
float fillLevel = 0;
float weight = 0;

void setup() {
  Serial.begin(9600);

  pinMode(ULTRASONIC_TRIG, OUTPUT);
  pinMode(ULTRASONIC_ECHO, INPUT);

  // HX711 load cell init would go here
  // LoRaWAN stack initialization would go here

  Serial.println("ESP32 Smart Waste Bin Node Initialized");
}

float readUltrasonicLevel() {
  // Conceptual function
  // Real implementation uses pulseIn()
  return random(30, 100); // simulate %
}

float readWeight() {
  // Conceptual load cell read
  return random(1, 15) / 1.2;
}

void sendLoRaPayload(float level, float weight) {
  // Conceptual LoRaWAN uplink
  Serial.print("Sending Payload → ");
  Serial.print("Level: ");
  Serial.print(level);
  Serial.print("% | Weight: ");
  Serial.print(weight);
  Serial.println(" kg");
}

void loop() {
  fillLevel = readUltrasonicLevel();
  weight = readWeight();

  Serial.println("---- Bin Status ----");
  Serial.print("Fill Level: ");
  Serial.print(fillLevel);
  Serial.println("%");

  Serial.print("Weight: ");
  Serial.print(weight);
  Serial.println(" kg");

  // Priority logic
  if (fillLevel > FILL_THRESHOLD || weight > WEIGHT_THRESHOLD) {
    sendLoRaPayload(fillLevel, weight);
  }

  // Deep sleep simulation
  Serial.println("Entering Deep Sleep...");
  delay(60000); // simulate low-power cycle
}
