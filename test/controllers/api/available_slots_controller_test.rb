require "test_helper"

class Api::AvailableSlotsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_available_slots_url, params: { event_id: events(:one).id, date: "2026-04-05" }
    assert_response :success
  end
end
