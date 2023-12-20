class UserSerializer < ActiveModel::Serializer
  attributes :first_name, :last_name, :events
end
