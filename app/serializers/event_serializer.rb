class EventSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :date, :jam, :battle
end
