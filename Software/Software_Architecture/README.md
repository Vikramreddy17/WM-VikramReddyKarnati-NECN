## Software Architecture

The software architecture follows a layered IoT design separating sensing, communication, processing, and visualization.

### Layers

#### 1. Edge Layer (Smart Bin)
- ESP32 reads ultrasonic and load cell sensor data
- Applies threshold logic (e.g., >80% fill)
- Sends compact JSON payload via LoRaWAN

#### 2. Network Layer
- LoRaWAN gateways receive uplink packets
- Packets are forwarded to the LoRaWAN Network Server
- Network server performs authentication and de-duplication

#### 3. Application Layer
- MQTT broker receives cleaned data
- Backend server stores and processes bin data
- Alert logic identifies critical bins

#### 4. Visualization Layer
- Web dashboard displays bin status
- Highlights critical bins
- Supports route optimization decisions

### Architecture Benefits
- Separation of concerns
- Scalable for city-wide deployment
- Low power usage at edge devices
