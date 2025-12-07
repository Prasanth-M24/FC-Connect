import p1_img from './tomato.png';
import p2_img from './potato.jpg';
import p3_img from './beetroot.jpg';
import p4_img from './carrot.jpeg'
import p5_img from './cabbage.jpeg'
import p6_img from './onion.jpeg'
import p7_img from './chili.jpeg'
import p8_img from './brinjal.jpeg'
import p9_img from './spinach.jpeg'
import p10_img from './cucumber.jpeg'
import p11_img from './beans.jpeg'
import p12_img from './radish.jpeg'
import p13_img from './ragi.jpeg'
import p14_img from './wheat.jpeg'
import p15_img from './barley.jpeg'
import p16_img from './maize.jpeg'
import p17_img from './bajra.jpeg'
import p18_img from './sorghum.jpeg'
import p19_img from './oats.jpeg'
import p20_img from './Foxtail_Millet.jpeg'
import p21_img from './Pearl_Millet.jpeg'
import p22_img from './Corn.jpeg'
import p23_img from './Quinoa.jpeg'
import p24_img from './Jowar.jpeg'
import p25_img from './paddy_seed.jpeg'
import p26_img from './Sunflower_Seed.jpeg'
import p27_img from './Mustard_Seed.jpeg'
import p28_img from './Sesame_Seed.jpeg'
import p29_img from './Groundnut_Seed.jpeg'
import p30_img from './Coriander_Seed.jpeg'
import p31_img from './Cumin_Seed.jpeg'
import p32_img from './Cotton_Seed.jpeg'
import p33_img from './Castor_Seed.jpeg'
import p34_img from './Maize_Seed.jpeg'
import p35_img from './Wheat_Seed.jpeg'
import p36_img from './Green_Gram_Seed.jpeg'

const agri_products = [
  {
    id: 1,
    name: "Tomato",
    category: "vegetables",
    img: p1_img,
    price: 45.0,
    state: "Tamil Nadu",
    district: "Chennai",
    phone: "9894596552",
    farmer: "Prasanth"
  },
  {
    id: 2,
    name: "Potato",
    category: "vegetables",
    img: p2_img,
    price: 40.0,
    state: "Tamil Nadu",
    district: "Coimbatore",
    phone: "8754260806",
    farmer: "Murugan"
  },
  {
    id: 3,
    name: "Beetroot",
    category: "vegetables",
    img: p3_img,
    price: 50.0,
    state: "Kerala",
    district: "Ernakulam",
    phone: "8056997498",
    farmer: "Sameer"
  },
  {
    id: 4,
    name: "Carrot",
    category: "vegetables",
    img: p4_img,
    price: 85.0,
    state: "Karnataka",
    district: "Bangalore",
    phone: "6380950429",
    farmer: "Karthikeyan"
  },
  {
    id: 5,
    name: "Cabbage",
    category: "vegetables",
    img: p5_img,
    price: 85.0,
    state: "Andhra Pradesh",
    district: "Vijayawada",
    phone: "7010196435",
    farmer: "Melwin"
  },
  {
    id: 6,
    name: "Onion",
    category: "vegetables",
    img: p6_img,
    price: 85.0,
    state: "Maharashtra",
    district: "Nashik",
    phone: "9876543215"
  },
  {
    id: 7,
    name: "Chili",
    category: "vegetables",
    img: p7_img,
    price: 85.0,
    state: "Andhra Pradesh",
    district: "Guntur",
    phone: "9876543216"
  },
  {
    id: 8,
    name: "Brinjal",
    category: "vegetables",
    img: p8_img,
    price: 85.0,
    state: "Telangana",
    district: "Warangal",
    phone: "9876543217"
  },
  {
    id: 9,
    name: "Spinach",
    category: "vegetables",
    img: p9_img,
    price: 85.0,
    state: "Tamil Nadu",
    district: "Madurai",
    phone: "9876543218"
  },
  {
    id: 10,
    name: "Cucumber",
    category: "vegetables",
    img: p10_img,
    price: 85.0,
    state: "Kerala",
    district: "Thrissur",
    phone: "9876543219"
  },
  {
    id: 11,
    name: "Beans",
    category: "vegetables",
    img: p11_img,
    price: 85.0,
    state: "Karnataka",
    district: "Mysore",
    phone: "9876543220"
  },
  {
    id: 12,
    name: "Radish",
    category: "vegetables",
    img: p12_img,
    price: 85.0,
    state: "Punjab",
    district: "Ludhiana",
    phone: "9876543221"
  },
  {
    id: 13,
    name: "Ragi",
    category: "grains",
    img: p13_img,
    price: 85.0,
    state: "Karnataka",
    district: "Hassan",
    phone: "9876543222"
  },
  {
    id: 14,
    name: "Wheat",
    category: "grains",
    img: p14_img,
    price: 85.0,
    state: "Punjab",
    district: "Amritsar",
    phone: "9876543223"
  },
  {
    id: 15,
    name: "Barley",
    category: "grains",
    img: p15_img,
    price: 85.0,
    state: "Rajasthan",
    district: "Jaipur",
    phone: "9876543224"
  },
  {
    id: 16,
    name: "Maize",
    category: "grains",
    img: p16_img,
    price: 85.0,
    state: "Bihar",
    district: "Patna",
    phone: "9876543225"
  },
  {
    id: 17,
    name: "Bajra",
    category: "grains",
    img: p17_img,
    price: 85.0,
    state: "Rajasthan",
    district: "Bikaner",
    phone: "9876543226"
  },
  {
    id: 18,
    name: "Sorghum",
    category: "grains",
    img: p18_img,
    price: 85.0,
    state: "Maharashtra",
    district: "Solapur",
    phone: "9876543227"
  },
  {
    id: 19,
    name: "Oats",
    category: "grains",
    img: p19_img,
    price: 85.0,
    state: "Haryana",
    district: "Karnal",
    phone: "9876543228"
  },
  {
    id: 20,
    name: "Foxtail Millet",
    category: "grains",
    img: p20_img,
    price: 85.0,
    state: "Andhra Pradesh",
    district: "Anantapur",
    phone: "9876543229"
  },
  {
    id: 21,
    name: "Pearl Millet",
    category: "grains",
    img: p21_img,
    price: 85.0,
    state: "Gujarat",
    district: "Bhavnagar",
    phone: "9876543230"
  },
  {
    id: 22,
    name: "Corn",
    category: "grains",
    img: p22_img,
    price: 85.0,
    state: "Madhya Pradesh",
    district: "Indore",
    phone: "9876543231"
  },
  {
    id: 23,
    name: "Quinoa",
    category: "grains",
    img: p23_img,
    price: 85.0,
    state: "Uttarakhand",
    district: "Dehradun",
    phone: "9876543232"
  },
  {
    id: 24,
    name: "Jowar",
    category: "grains",
    img: p24_img,
    price: 85.0,
    state: "Telangana",
    district: "Nizamabad",
    phone: "9876543233"
  },
  {
    id: 25,
    name: "Paddy Seed",
    category: "seeds",
    img: p25_img,
    price: 85.0,
    state: "West Bengal",
    district: "Kolkata",
    phone: "9876543234"
  },
  {
    id: 26,
    name: "Sunflower Seed",
    category: "seeds",
    img: p26_img,
    price: 85.0,
    state: "Karnataka",
    district: "Davangere",
    phone: "9876543235"
  },
  {
    id: 27,
    name: "Mustard Seed",
    category: "seeds",
    img: p27_img,
    price: 85.0,
    state: "Rajasthan",
    district: "Alwar",
    phone: "9876543236"
  },
  {
    id: 28,
    name: "Sesame Seed",
    category: "seeds",
    img: p28_img,
    price: 85.0,
    state: "Tamil Nadu",
    district: "Erode",
    phone: "9876543237"
  },
  {
    id: 29,
    name: "Groundnut Seed",
    category: "seeds",
    img: p29_img,
    price: 85.0,
    state: "Gujarat",
    district: "Junagadh",
    phone: "9876543238"
  },
  {
    id: 30,
    name: "Coriander Seed",
    category: "seeds",
    img: p30_img,
    price: 85.0,
    state: "Madhya Pradesh",
    district: "Guna",
    phone: "9876543239"
  },
  {
    id: 31,
    name: "Cumin Seed",
    category: "seeds",
    img: p31_img,
    price: 85.0,
    state: "Rajasthan",
    district: "Jodhpur",
    phone: "9876543240"
  },
  {
    id: 32,
    name: "Cotton Seed",
    category: "seeds",
    img: p32_img,
    price: 85.0,
    state: "Maharashtra",
    district: "Yavatmal",
    phone: "9876543241"
  },
  {
    id: 33,
    name: "Castor Seed",
    category: "seeds",
    img: p33_img,
    price: 85.0,
    state: "Gujarat",
    district: "Rajkot",
    phone: "9876543242"
  },
  {
    id: 34,
    name: "Maize Seed",
    category: "seeds",
    img: p34_img,
    price: 85.0,
    state: "Bihar",
    district: "Gaya",
    phone: "9876543243"
  },
  {
    id: 35,
    name: "Wheat Seed",
    category: "seeds",
    img: p35_img,
    price: 85.0,
    state: "Punjab",
    district: "Bathinda",
    phone: "9876543244"
  },
  {
    id: 36,
    name: "Green Gram Seed",
    category: "seeds",
    img: p36_img,
    price: 85.0,
    state: "Tamil Nadu",
    district: "Trichy",
    phone: "9876543245"
  }
];

export default agri_products;