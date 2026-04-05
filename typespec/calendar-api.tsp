@server
@service("calendar-api")
@useDocs("calendar-api.tsp")

namespace Calendar {
  model Owner {
    @doc("Unique identifier for the owner")
    id: int32;

    @doc("Owner name")
    name: string;

    @doc("Owner email")
    email: string;

    @doc("Creation timestamp")
    created_at: string;

    @doc("Update timestamp")
    updated_at: string;
  }

  model Event {
    @doc("Unique identifier for the event")
    id: int32;

    @doc("Reference to the owner")
    owner_id: int32;

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

    @doc("Owner details (optional)")
    @optional
    owner?: Owner;
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

  model DashboardResponse {
    @doc("Owner information")
    owner: Owner;

    @doc("Owner events")
    events: Event[];

    @doc("All bookings")
    bookings: Booking[];
  }

  @doc("Get all event types (public)")
  @get
  @route("/events")
  listEvents(): Event[];

  @doc("Get a specific event by ID (public)")
  @get
  @route("/events/{id}")
  getEvent(id: int32): Event;

  @doc("Create a new event type (owner only)")
  @post
  @route("/events")
  createEvent(body: CreateEventRequest): Event;

  @doc("Delete an event type (owner only)")
  @delete
  @route("/events/{id}")
  deleteEvent(id: int32): void;

  @doc("Get owner information")
  @get
  @route("/owner")
  getOwner(): Owner;

  @doc("Get owner dashboard with all events and bookings")
  @get
  @route("/owner/dashboard")
  getDashboard(): DashboardResponse;

  @doc("Get all bookings (owner only)")
  @get
  @route("/bookings")
  listBookings(): Booking[];

  @doc("Get a specific booking by ID")
  @get
  @route("/bookings/{id}")
  getBooking(id: int32): Booking;

  @doc("Create a new booking (guest)")
  @post
  @route("/bookings")
  createBooking(body: CreateBookingRequest): Booking;

  @doc("Delete a booking (owner only)")
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