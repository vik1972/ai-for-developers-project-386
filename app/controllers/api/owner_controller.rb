class Api::OwnerController < ApplicationController
  before_action :set_owner

  @doc("Get owner information")
  def show
    render json: @owner
  end

  @doc("Get owner dashboard with all events and bookings")
  def dashboard
    @events = @owner.events.includes(:bookings)
    @all_bookings = @owner.bookings.includes(:event).order(:slot)
    
    render json: {
      owner: @owner,
      events: @events,
      bookings: @all_bookings
    }
  end

  @doc("Create a new event type")
  def create_event
    @event = Event.new(event_params)
    @event.owner = @owner

    if @event.save
      render json: @event, status: :created
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  @doc("Delete an event type")
  def delete_event
    @event = @owner.events.find(params[:id])
    @event.destroy
    head :no_content
  end

  @doc("Get all owner bookings")
  def bookings
    @bookings = @owner.bookings.includes(:event).order(:slot)
    render json: @bookings
  end

  @doc("Delete a booking")
  def delete_booking
    @booking = @owner.bookings.find(params[:id])
    @booking.destroy
    head :no_content
  end

  private

  def set_owner
    @owner = Owner.predefined_owner
  end

  def event_params
    params.require(:event).permit(:name, :description, :duration)
  end
end