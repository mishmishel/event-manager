class EventsJoinedSerializer < ActiveModel::Serializer
  attributes :event_title, :event_date, :user_first_name, :user_last_name, :event_id

  def event_title
    object.event.title
  end

  def event_date
    object.event.date
  end

  def event_id
    object.event.id
  end

  # including user first name and last name in joined events section

  def user_first_name
    object.user.first_name
  end

  def user_last_name
    object.user.last_name
  end
end
