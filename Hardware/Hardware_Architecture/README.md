## Hardware Architecture

The hardware architecture of the Smart Waste Bin Monitoring System consists of a low-power sensing and communication unit installed inside each waste bin.

### Core Components
- ESP32 microcontroller for sensor interfacing and data processing
- Waterproof Ultrasonic Sensor (JSN-SR04T) for fill-level measurement
- Load Cell with HX711 amplifier for weight measurement (optional redundancy)
- LoRaWAN communication module for long-range, low-power data transmission
- Battery power supply with deep-sleep capability

### Hardware Data Flow
1. Sensors collect fill-level and weight data.
2. ESP32 processes raw sensor values and applies threshold logic.
3. Processed data is transmitted via LoRaWAN.
4. ESP32 enters deep sleep to conserve power.

### Design Considerations
- Low power consumption using ESP32 deep sleep
- Outdoor suitability using waterproof sensors
- Modular design for easy sensor replacement
