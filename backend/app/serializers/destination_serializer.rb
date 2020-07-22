class DestinationSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :city, :country, :sights
end
