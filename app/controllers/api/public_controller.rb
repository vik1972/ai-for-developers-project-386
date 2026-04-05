class Api::PublicController < ApplicationController
  skip_before_action :verify_authenticity_token

  # Get all public event types for guests
  def events
    @events = Event.all.includes(:owner)
    render json: @events
  end

  # Get a specific event details for guests
  def event
    @event = Event.find(params[:id])
    render json: @event
  end

  # Create a new booking for guest
  def create_booking
    @booking = Booking.new(booking_params)

    if @booking.save
      render json: @booking, status: :created
    else
      render json: @booking.errors, status: :unprocessable_entity
    end
  end

  private

  def booking_params
    params.permit(:event_id, :slot)
  end
end
