import logo from './logo.png'
import add_icon from './add_icon.png'
import order_icon from './order_icon.png'
import profile_image from './profile_image.png'
import upload_area from './upload_area.png'
import parcel_icon from './parcel_icon.png'

interface Assets {
  logo: string;
  add_icon: string;
  order_icon: string;
  profile_image: string;
  upload_area: string;
  parcel_icon: string;
}

export const assets:Assets ={
    logo,
    add_icon,
    order_icon,
    profile_image,
    upload_area,
    parcel_icon
}

export const url = 'http://localhost:4000'