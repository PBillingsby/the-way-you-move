class DestinationsController < ApplicationController
  def create
    destination = Destination.find_or_create_by(city: params[:city], country: params[:country])
    destination_api_string = 'http://api.opentripmap.com/0.1/en/places/radius?radius=10000&lon=' + destination.longitude.to_s + '&lat=' + destination.latitude.to_s + '&kinds=interesting_places&rate=3&limit=10&apikey=' + ENV["GEOCODE_KEY"]
    city_api(destination_api_string)
  end

  def index
    destinations = Destination.all
    render json: destinations
  end

  def show
    destination = Destination.find_by(id: params[:id])
    render json: DestinationSerializer.new(destination)
  end

  private
  def city_api(url)
    destination = Destination.find_by(city: params[:city], country: params[:country])
    response = HTTParty.get(url)
    response["features"].each do |resp|
      sight_name = resp["properties"]["name"]
      sight_kind = resp["properties"]["kinds"].split(",")[-1].split("_").join(" ").titleize
      destination.sights.create(name: sight_name, sight_type: sight_kind)
    end
  end
end