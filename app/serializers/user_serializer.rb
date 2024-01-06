class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :username, :last_name, :events

  def events
    object.events.map do |event|
      {
        title: event.title,
        date: event.date,
        description: event.description
      }
    end
  end

  def events_joineds
    object.events_joineds.map do |events_joined|
      {
        title: event.title,
        date: event.date,
        description: event.description
      }
    end
  end

end
