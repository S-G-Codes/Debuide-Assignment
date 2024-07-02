Hospital Room Reservation System
This project is a hospital room reservation system designed to manage room and equipment assignments based on patient needs. It handles reservations for different types of hospital rooms (Normal, Oxygen, ICU) and ensures that all necessary equipment is available for each room type.

Features
* Room Management: Manages different types of rooms - Normal, Oxygen, and ICU.
* Equipment Management: Keeps track of available equipment including flat beds, recliner beds, ventilators, oxygen cylinders, normal masks, and non-rebreather masks.
* Reservation Handling: Ensures rooms and equipment are reserved atomically, with rollback mechanisms to maintain consistency.
* API Endpoint: Provides an API endpoint to make reservations and check room availability.
************************Technologies Used************************
* JavaScript: Core application logic.
* Next.js: API routing and server-side logic.


Project Structure

├── lib
│   ├── Models
│   │   ├── Room.js
│   │   ├── Equipment.js
│   │   └── Reservation.js
│   ├── Repositories
│   │   ├── RoomRepository.js
│   │   └── EquipmentRepository.js
│   └── Services
│       └── ReservationService.js
├── pages
│   └── api
│       └── reservation.js
└── README.md



Usage
Running the Project
Install Dependencies


npm install
Start the Next.js Server


npm run dev
Make a Reservation
Send a POST request to /api/reservation with the roomType in the body.
Eg-
json
{
  "roomType": "ICU"
}
API Response
Success:

json

{
  "reservation": {
    "roomType": "ICU",
    "patientId": "randomly_generated_id"
  },
  "availability": {
    "Normal": 49,
    "Oxygen": 50,
    "ICU": 19
  }
}
Failure:

json

{
  "error": "Reservation not possible",
  "availability": {
    "Normal": 50,
    "Oxygen": 50,
    "ICU": 20
  }
}


* Key Methods
RoomRepository.js
getAvailability(): Returns the current availability of all room types.
reserveRoom(type): Reserves a room of the specified type.
EquipmentRepository.js
getAvailability(): Returns the current availability of all equipment.
reserveEquipment(type, quantity): Reserves the specified quantity of equipment.
ReservationService.js
makeReservation(roomType): Manages the entire reservation process including availability checks and resource reservation.
canReserve(roomType): Checks if a room of the specified type can be reserved with the necessary equipment.
getRemainingAvailability(): Returns the remaining availability of rooms and equipment.
