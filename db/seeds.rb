# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Event.create(
#   title: "Smoked",
#   description: "Beginner friendly battle",
#   date: Date.new(2023, 10, 31),
#   battle: true,
#   jam: false
# )

# Event.create(
#   title: "Synergy",
#   description: "SXP hosted event for intermediate to advanced dancers",
#   date: Date.new(2023, 12, 12),
#   battle: true,
#   jam: false
# )

# Event.create(
#   title: "UNI Jam",
#   description: "Uni Society hosted jam",
#   date: Date.new(2023, 05, 12),
#   battle: false,
#   jam: true
# )

# User.create (
#   username: "misheltyur",
#   first_name: "Mishel",
#   last_name: "Tyurkova",
#   email: "misheltyurkova@gmail.com",
#   password: "12345"
# )

# User.create(
#   username: "misheltyur",
#   first_name: "Mishel",
#   last_name: "Tyurkova",
#   email: "misheltyurkova@gmail.com",
#   password: "12345")

# Comment.create(
#   text: "This is a reminder to enroll to this event!",
#   user_id: 1,
#   event_id: 19
# )