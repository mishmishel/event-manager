class EventSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :date, :jam, :battle, :created_by

  def created_by
    object.created_by
  end
end
