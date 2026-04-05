require "test_helper"

class Api::AvailableSlotsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_available_slots_index_url
    assert_response :success
  end
end
