class CommentSerializer < ActiveModel::Serializer
  attributes :text, :user, :id

  def user
    {
      first_name: object.user.first_name,
      last_name: object.user.last_name,
      username: object.user.username,
      id: object.user.id
    }
  end
  
end
