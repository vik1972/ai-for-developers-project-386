@server
@service("calendar-api")
@useDocs("calendar-api.tsp")

namespace Calendar {
  model Event {
    @doc("Unique identifier for the event")
    id: int32;
    
    @doc("Name of the event type")
    name: string;
    
    @doc("Description of the event type")
    description: string;
    
    @doc("Duration in minutes")
    duration: int32;
    
    @doc("Creation timestamp")
    created_at: string;
    
    @doc("Update timestamp")
    updated_at: string;
  }

  model Booking {
    @doc("Unique identifier for the booking")
    id: int32;
    
    @doc("Reference to the event")
    event_id: int32;
    
    @doc("Booking slot datetime")
    slot: string;
    
    @doc("Creation timestamp")
    created_at: string;
    
    @doc("Update timestamp")
    updated_at: string;
    
    @doc("Event details (optional)")
    @optional
    event?: Event;
  }

  model CreateEventRequest {
    @doc("Name of the event type")
    name: string;
    
    @doc("Description of the event type")
    description: string;
    
    @doc("Duration in minutes")
    duration: int32;
  }

  model CreateBookingRequest {
    @doc("Reference to the event")
    event_id: int32;
    
    @doc("Booking slot datetime")
    slot: string;
  }

  model AvailableSlotsResponse {
    @doc("List of available time slots")
    available_slots: string[];
  }

  @doc("Get all event types")
  @get
  @route("/events")
  listEvents(): Event[];

  @doc("Get a specific event by ID")
  @get
  @route("/events/{id}")
  getEvent(id: int32): Event;

  @doc("Create a new event type")
  @post
  @route("/events")
  createEvent(body: CreateEventRequest): Event;

  @doc("Delete an event type")
  @delete
  @route("/events/{id}")
  deleteEvent(id: int32): void;

  @doc("Get all bookings")
  @get
  @route("/bookings")
  listBookings(): Booking[];

  @doc("Get a specific booking by ID")
  @get
  @route("/bookings/{id}")
  getBooking(id: int32): Booking;

  @doc("Create a new booking")
  @post
  @route("/bookings")
  createBooking(body: CreateBookingRequest): Booking;

  @doc("Delete a booking")
  @delete
  @route("/bookings/{id}")
  deleteBooking(id: int32): void;

  @doc("Get available time slots for an event on a specific date")
  @get
  @route("/available_slots")
  getAvailableSlots(
    @query event_id: int32,
    @query date: string
  ): AvailableSlotsResponse;
}