class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :events

  def events
    object.events.map do |event|
      {
        title: event.title,
        date: event.date,
        description: event.description
      }
    end
  end
end
