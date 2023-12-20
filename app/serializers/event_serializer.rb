class EventSerializer < ActiveModel::Serializer
  attributes :title, :description, :date, :jam, :battle
end
