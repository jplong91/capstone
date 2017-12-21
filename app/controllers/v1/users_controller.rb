class V1::UsersController < ApplicationController
  
  def create
    user = User.new(
      display_name: params[:display_name],
      first_name: params[:first_name],
      last_name: params[:last_name],
      email: params[:email],
      password: params[:password],
      password_confirmation: params[:password_confirmation]
    )
    if user.save
      render json: {status: "User successfully created"}, status: :created
    else
      render json: {errors: user.errors.full_messages}, status: :bad_request
    end
  end

end

