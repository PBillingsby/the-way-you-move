class Destination < ActiveRecord::Base
  has_many :sights
  geocoded_by :address
  after_validation :geocode, if: ->(obj){ obj.city.present? and obj.city_changed? }

  def address
    [city, country].compact.join(', ')
  end
  

end