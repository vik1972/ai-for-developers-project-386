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

    start_time = Time.parse(date).beginning_of_day
    end_time = Time.parse(date).end_of_day

    available_slots = []
    current_time = start_time

    while current_time < end_time
      slot_end = current_time + event.duration.minutes

      if slot_end <= end_time &&
         !occupied_slots.any? { |occupied|
           (current_time >= occupied && current_time < occupied + event.duration.minutes) ||
           (slot_end > occupied && slot_end <= occupied + event.duration.minutes)
         }
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
