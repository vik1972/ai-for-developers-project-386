class Api::AvailableSlotsController < ApplicationController
  def index
    event_id = params[:event_id]
    date = params[:date]

    if event_id.blank? || date.blank?
      render json: { error: "event_id and date are required" }, status: :bad_request
      return
    end

    event = Event.find(event_id)
    occupied_slots = Booking.where(event_id: event_id)
                           .where("DATE(slot) = ?", date)
                           .pluck(:slot)

    start_time = Time.parse(date).beginning_of_day.utc
    end_time = Time.parse(date).end_of_day.utc
    now = Time.now.utc

    # If the requested date is in the past, all slots are unavailable
    is_past_date = end_time < now

    available_slots = []
    current_time = start_time

    while current_time < end_time
      slot_end = current_time + event.duration.minutes

      # Skip slots that are in the past
      is_in_past = current_time < now

      is_occupied = occupied_slots.any? { |occupied|
        occupied_start = occupied.is_a?(String) ? Time.parse(occupied).utc : occupied.utc
        occupied_end = occupied_start + event.duration.minutes

        overlap = (current_time >= occupied_start && current_time < occupied_end) ||
                  (slot_end > occupied_start && slot_end <= occupied_end) ||
                  (current_time <= occupied_start && slot_end >= occupied_end)

        overlap
      }

      if slot_end <= end_time && !is_occupied && !is_in_past && !is_past_date
        available_slots << current_time.strftime("%Y-%m-%d %H:%M")
      end

      current_time += 30.minutes
    end

    render json: {
      available_slots: available_slots,
      occupied_slots: occupied_slots.map { |s| s.strftime("%Y-%m-%d %H:%M") }
    }
  end
end
