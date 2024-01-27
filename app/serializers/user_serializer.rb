class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :username, :last_name, :events

  def events
    object.events.map do |event|
      {
        title: event.title,
        date: event.date,
        description: event.description,
        created_by: event.created_by
      }
    end
  end

  def events_joineds
    object.events_joineds.map do |events_joined|
      {
        id: event_joined.id,
        title: event_joined.title,
        date: event_joined.date,
        description: event_joined.description
      }
    end
  end

end
