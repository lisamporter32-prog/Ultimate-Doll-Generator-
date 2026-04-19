import React, { useMemo, useState } from "react";

const SELECT_OPTIONS = {
  race: ["", "Black / African", "African American", "Afro-Caribbean", "Afro-Latina", "White / Caucasian", "European", "Eastern European", "Mediterranean", "Middle Eastern", "North African", "Arab", "South Asian", "Indian", "Pakistani", "Bangladeshi", "Sri Lankan", "Southeast Asian", "Filipino", "Vietnamese", "Thai", "Indonesian", "East Asian", "Chinese", "Japanese", "Korean", "Pacific Islander", "Native American", "Latina / Latino", "Mixed / Multiracial"],
  scenario: ["", "Birthday Photoshoot","Graduation Shoot","Wedding Guest","Vacation Look","Branding Shoot","Fashion Editorial","Street Style Shoot","Instagram Post","Red Carpet Event","Music Video Scene","Casual Day Out","Date Night","Girls Night Out","Brunch Scene","Work Day","Gym Session","Airport Travel","Beach Day","Holiday Celebration","Luxury Lifestyle"],
  action: ["", "Taking Selfie","Talking on Phone","Shopping","Drinking Coffee","Walking Dog","Taking Pictures","Filming Content","Dancing","Driving","Working on Laptop","Texting","Listening to Music","Posing for Photos","Waving","Blowing Kiss","Running","Sitting Relaxed","Looking Around","Holding Bag","Checking Phone"],
  jewelry: ["", "Hoop Earrings","Stud Earrings","Drop Earrings","Chandelier Earrings","Layered Necklaces","Name Necklace","Tennis Chain","Pendant Necklace","Choker Necklace","Anklet","Stackable Rings","Statement Ring","Bracelet","Bangle Bracelet","Cuff Bracelet","Luxury Watch","Charm Bracelet","Body Jewelry","Waist Chain"] ,
  teethStyle: ["", "Natural Teeth", "Bright White Teeth", "Hollywood Smile", "Perfect Smile", "Gap Teeth", "Crooked Teeth", "Braces", "Clear Braces", "Colored Braces", "Grillz (Gold)", "Grillz (Silver)", "Diamond Grillz", "Iced Out Grillz", "Single Gold Tooth", "Multiple Gold Teeth", "Fang Style Teeth", "Sharp Teeth", "Vampire Teeth", "Tooth Gem", "Tooth Gems (Multiple)", "Pearl Teeth", "Metal Caps", "Platinum Teeth", "Rainbow Grillz"],
  lipColor: ["", "Nude","Pink","Hot Pink","Baby Pink","Rose","Mauve","Peach","Coral","Red","Cherry Red","Burgundy","Wine","Plum","Purple","Lavender","Violet","Brown","Chocolate","Mocha","Caramel","Beige","Terracotta","Burnt Orange","Gold","Rose Gold","Copper","Bronze","Silver","Black","White","Gloss Clear","Gloss Pink","Matte Nude","Matte Red","Matte Brown","Ombre Pink","Ombre Nude","Ombre Red","Gradient Lip","Dual Tone Pink & Gold","Dual Tone Red & Black","Glitter Pink","Glitter Gold","Glitter Silver","Holographic","Iridescent","Neon Pink","Neon Orange","Neon Purple","Pastel Mix"],
  outfitAccessories: ["", "Belt","Waist Belt","Chain Belt","Designer Belt","Scarf","Silk Scarf","Head Scarf","Bandana","Sunglasses","Oversized Sunglasses","Cat Eye Glasses","Aviator Glasses","Square Glasses","Round Glasses","Gloves","Leather Gloves","Fingerless Gloves","Long Gloves","Arm Warmers","Leg Warmers","Waist Bag","Fanny Pack","Crossbody Strap","Suspenders","Tie","Bow Tie","Pocket Square","Brooch","Pin","Hair Bow","Hair Clips","Claw Clip","Headband","Tiara","Crown","Beanie","Bucket Hat","Baseball Cap","Beret","Fedora","Sun Hat","Cowboy Hat","Earrings Statement","Neck Scarf","Shawl","Cape","Sash","Anklet","Body Chain","Waist Beads"] ,
  hairDetails: ["", "Middle Part", "Side Part", "Deep Side Part", "Zig-Zag Part", "Laid Edges", "Natural Edges", "Dramatic Edges", "Baby Hairs Styled", "Slicked Hairline", "Flyaways", "Frizz", "Wet Look Hair", "Dry Textured Hair", "Voluminous Roots", "Flat Roots", "Layered Ends", "Blunt Ends", "Feathered Ends", "Curled Ends", "Flipped Ends", "Crimped Sections", "Highlighted Strands", "Face-Framing Pieces", "Half Up Detail", "Pinned Back Sections"] ,
  hairLength: ["", "Bald", "Very Short", "Short", "Short-Medium", "Medium", "Medium-Long", "Long", "Very Long", "Waist Length", "Hip Length", "Knee Length", "Pixie Length", "Bob Length", "Lob (Long Bob)", "Shoulder Length", "Chest Length", "Bra Strap Length", "Mid Back Length", "Classic Length", "Extra Long Extensions", "Layered Length", "Uneven Length", "Tapered Length"],
  tattooStyle: ["", "No Tattoos", "Small Tattoo", "Minimal Tattoo", "Fine Line Tattoo", "Full Sleeve Tattoo", "Half Sleeve Tattoo", "Quarter Sleeve Tattoo", "Full Back Tattoo", "Upper Back Tattoo", "Lower Back Tattoo", "Chest Tattoo", "Collarbone Tattoo", "Shoulder Tattoo", "Arm Tattoo", "Forearm Tattoo", "Hand Tattoo", "Finger Tattoos", "Neck Tattoo", "Side Neck Tattoo", "Behind Ear Tattoo", "Face Tattoo", "Leg Tattoo", "Thigh Tattoo", "Calf Tattoo", "Ankle Tattoo", "Foot Tattoo", "Rib Tattoo", "Hip Tattoo", "Stomach Tattoo", "Waist Tattoo", "Tribal Tattoo", "Floral Tattoo", "Butterfly Tattoo", "Rose Tattoo", "Dragon Tattoo", "Snake Tattoo", "Script Tattoo", "Quote Tattoo", "Name Tattoo", "Matching Tattoos", "Couple Tattoo", "Colorful Tattoo", "Black Ink Tattoo", "Watercolor Tattoo", "Realistic Tattoo", "Cartoon Tattoo", "Anime Tattoo", "Chibi Tattoo", "Glow Tattoo", "Neon Tattoo"],
  dogBreed: ["", "Labrador Retriever","French Bulldog","Golden Retriever","German Shepherd","Poodle","Bulldog","Beagle","Rottweiler","Dachshund","Siberian Husky","Boxer","Doberman","Great Dane","Shih Tzu","Chihuahua","Pomeranian","Yorkshire Terrier","Border Collie","Corgi","Australian Shepherd","Pit Bull","Maltese","Bichon Frise","Boston Terrier","Cane Corso","Akita","Samoyed","Weimaraner","Greyhound"],
  catBreed: ["", "Domestic Shorthair","Domestic Longhair","Siamese","Persian","Maine Coon","Ragdoll","Bengal","Sphynx","British Shorthair","Scottish Fold","Abyssinian","Birman","Oriental Shorthair","Russian Blue","Norwegian Forest Cat","Savannah","Devon Rex","Cornish Rex","Himalayan","Tonkinese","Turkish Van","American Shorthair","Exotic Shorthair","Manx","Chartreux","Balinese","Ocicat","Selkirk Rex","Bombay"],
  petSize: ["", "Tiny","Extra Small","Small","Small-Medium","Medium","Medium-Large","Large","Extra Large","Giant","Mini","Teacup","Compact","Long","Tall","Short","Chubby","Lean","Athletic","Fluffy","Heavy","Lightweight"],
  designerGlasses: ["", "Ray-Ban", "Gucci", "Prada", "Chanel", "Dior", "Versace", "Louis Vuitton", "Fendi", "Balenciaga", "YSL", "Tom Ford", "Cartier", "Burberry", "Bottega Veneta", "Givenchy", "Dolce & Gabbana", "Off-White", "Alexander McQueen", "Michael Kors"],
  brandShoes: ["", "Nike", "Adidas", "Jordan", "Yeezy", "Balenciaga", "Gucci", "Louis Vuitton", "Prada", "Versace", "Christian Louboutin", "Jimmy Choo", "Chanel", "Dior", "Fendi", "Givenchy", "Alexander McQueen", "Off-White", "Puma", "New Balance"],
  brandPurse: ["", "Louis Vuitton", "Gucci", "Chanel", "Dior", "Prada", "Fendi", "Hermès", "Balenciaga", "YSL", "Michael Kors", "Coach", "Kate Spade", "Burberry", "Valentino", "Bottega Veneta", "Givenchy", "Marc Jacobs", "Telfar", "Goyard"],
  outfitStyle: ["", "Streetwear","Luxury","Casual","Business Casual","Formal Wear","Evening Gown","Cocktail Dress","Clubwear","Lounge Wear","Athleisure","Sporty Fit","Gym Wear","Y2K Fashion","90s Throwback","70s Retro","Vintage Chic","Boho Style","Minimalist Style","Preppy Style","School Uniform","Church Outfit","Birthday Outfit","Baddie Outfit","Soft Girl Outfit","Clean Girl Aesthetic","Girly Glam","Princess Dress","Fairycore Outfit","Cottagecore Outfit","Edgy Fashion","Gothic Style","Punk Rock Style","Grunge Style","Hip Hop Glam","Celebrity Inspired","Influencer Fit","Vacation Outfit","Beachwear","Festival Outfit","Winter Cozy Fit","Fall Fashion","Spring Look","Summer Vibes","Denim Fit","Matching Set","Designer Outfit","Runway Fashion","Futuristic Outfit","Cosplay Style","Barbiecore"],
  pantsStyle: ["", "Skinny Jeans","Ripped Jeans","Mom Jeans","Boyfriend Jeans","Baggy Jeans","Cargo Pants","Joggers","Sweatpants","Leggings","Yoga Pants","Flare Pants","Bell Bottoms","Wide Leg Pants","Palazzo Pants","Straight Leg Pants","High Waisted Pants","Low Rise Pants","Leather Pants","Faux Leather Leggings","Denim Shorts","Biker Shorts","Mini Skirt","Midi Skirt","Maxi Skirt","Pleated Skirt","Pencil Skirt","A-Line Skirt","Skort","Tutu Skirt","Tennis Skirt","Cargo Skirt","Wrap Skirt","Bodycon Skirt","Slit Skirt","Fringe Skirt","Sequin Skirt","Linen Pants","Khaki Pants","Track Pants","Parachute Pants","Distressed Shorts","Cutoff Shorts","High Slit Pants","Layered Skirt","Corset Skirt Combo","Matching Set Bottoms","Printed Pants","Animal Print Bottoms","Satin Pants","Velvet Pants"],
  topStyle: ["", "Crop Top","Graphic Tee","Oversized T-Shirt","Fitted Tee","Tank Top","Ribbed Tank","Bodysuit","Long Sleeve Shirt","Turtleneck","Mock Neck Top","Blouse","Button-Up Shirt","Flannel Shirt","Denim Jacket Top","Hoodie","Zip-Up Hoodie","Sweatshirt","Off Shoulder Top","One Shoulder Top","Tube Top","Corset Top","Bustier Top","Peplum Top","Wrap Top","Halter Top","Backless Top","Sheer Top","Mesh Top","Lace Top","Satin Blouse","Silk Top","Knit Sweater","Cardigan","Cropped Jacket","Bomber Jacket","Blazer","Leather Jacket","Puffer Jacket","Fur Coat","Trench Coat","Cape Style Top","Graphic Hoodie","Rhinestone Top","Sequin Top","Fringe Top","Layered Top","Color Block Top","Neon Top","Vintage Tee","Designer Logo Shirt"],
  shoeStyle: ["", "Sneakers","Chunky Sneakers","High Top Sneakers","Platform Sneakers","Running Shoes","Heels","Stiletto Heels","Block Heels","Kitten Heels","Platform Heels","Pumps","Slingback Heels","Sandals","Strappy Sandals","Slides","Flip Flops","Boots","Ankle Boots","Knee High Boots","Thigh High Boots","Combat Boots","Cowboy Boots","Platform Boots","UGG Boots","Slippers","Ballet Flats","Loafers","Oxford Shoes","Espadrilles","Wedges","Designer Heels","Rhinestone Heels","Clear Heels","Lace-Up Heels","Open Toe Heels","Closed Toe Heels","Sock Boots","Fur Slides","Sport Sandals","Trail Shoes","Hiking Boots","Roller Skates","Ice Skates","Fashion Sneakers","Slip-On Shoes","Canvas Shoes","Vans Style","Crocs","Glitter Shoes","Metallic Shoes"],
  lipStyle: ["", "Full Lips", "Plump Lips", "Small Lips", "Wide Lips", "Heart-Shaped Lips", "Cupid's Bow Lips", "Glossy Lips", "Matte Lips", "Ombre Lips", "Gradient Lips", "Overlined Lips", "Natural Lips", "Defined Lip Line", "Soft Blurred Lips", "Bold Lip", "Nude Lip", "Shimmer Lips", "Metallic Lips", "Juicy Lips"],
  eyebrowStyle: ["", "Natural Brows", "Thick Brows", "Thin Brows", "Arched Brows", "High Arch", "Soft Arch", "Straight Brows", "Feathered Brows", "Fluffy Brows", "Defined Brows", "Bold Brows", "Soft Brows", "Ombre Brows", "Microbladed Brows", "Laminated Brows", "Sculpted Brows", "Short Brows", "Long Brows", "Clean Brows"],
  noseStyle: ["", "Small Nose", "Button Nose", "Straight Nose", "Wide Nose", "Narrow Nose", "Upturned Nose", "Downturned Nose", "Flat Nose", "Defined Nose", "Soft Nose", "Sharp Nose", "Rounded Tip", "Pointed Tip", "Broad Nose", "Slim Nose", "High Bridge", "Low Bridge", "Cute Nose", "Elegant Nose"],
  piercings: ["", "Nose Ring", "Nose Stud", "Septum Ring", "Double Nose Piercing", "Triple Nose Piercing", "Lip Ring", "Lower Lip Ring", "Upper Lip Ring", "Snake Bite Piercings", "Spider Bite Piercings", "Medusa Piercing", "Monroe Piercing", "Labret Piercing", "Vertical Labret", "Ashley Piercing", "Dahlia Piercing", "Angel Bite Piercings", "Bridge Piercing", "Dermal Piercing"],
  eyeStyle: ["", "Soft Eyes", "Dreamy Eyes", "Flirty Eyes", "Seductive Eyes", "Innocent Eyes", "Playful Eyes", "Fierce Eyes", "Confident Eyes", "Glossy Eyes", "Wet Look Eyes", "Shimmer Eyes", "Glitter Eyes", "Highlighted Eyes", "Reflective Eyes", "Bright Eyes", "Sparkle Eyes", "Glass Eyes", "Anime Eyes", "Bratz Eyes", "Chibi Eyes", "Luxury Eyes", "High Fashion Eyes", "Soft Glam Eyes", "Full Glam Eyes", "Natural Eyes", "Bold Eyes", "Smokey Eyes", "Golden Highlight Eyes", "Icy Eyes", "Radiant Eyes", "Glowing Eyes", "Neon Glow Eyes", "Starry Eyes", "Cartoon Eyes", "3D Eyes", "Detailed Eyes", "HD Eyes", "Realistic Eyes", "Hyper Realistic Eyes", "Fantasy Eyes", "Mystic Eyes", "Magical Eyes", "Crystal Eyes", "Metallic Eyes", "Pastel Eyes", "Rainbow Eyes", "Dual Color Eyes", "Holographic Eyes", "Luxury Shine Eyes"],
  skinFinish: ["", "Smooth Skin", "Glowing Skin", "Glossy Skin", "Soft Matte Skin", "Dewy Skin", "Clear Skin", "Radiant Skin", "Oiled Skin", "Shimmer Skin", "Body Glow Effect", "Sun-Kissed Skin", "Highlighted Collarbone", "Glass Skin", "Velvet Skin", "Luminous Skin", "Airbrushed Skin", "Hydrated Glow", "Golden Glow", "Bronzed Finish", "Natural Skin", "Fresh Skin", "Healthy Glow", "Soft Glow", "High Shine Skin", "Even Tone Skin", "Polished Skin", "HD Skin Detail", "Light Reflective Skin", "Silky Skin"],
  subjectType: ["", "Woman", "Man", "Girl", "Boy", "Toddler Girl", "Toddler Boy", "Teen Girl", "Teen Boy", "Adult", "Elder", "Twins", "Pet"],
  ageGroup: ["", "Baby", "Toddler", "Child", "Preteen", "Teen", "Young Adult", "Adult", "Mature Adult"],
  imageCount: ["", "1", "2", "3", "4", "5", "6"],
  artStyle: ["", "Chibi", "Exaggerated Chibi", "Bratz Inspired", "Bratz Chibi", "Digital Art", "Fantasy Art", "Hyper Ultra Realistic", "Luxe Realist", "Comic Book", "Watercolor", "Oil Painting", "Vector Art", "Cartoon", "Pixar Inspired", "Doll Box Style", "Fashion Illustration", "Jetsons Futuristic", "Hip Hop Glam", "70s Retro", "Soft Plush 3D", "Gothic", "Superhero / Heroes"],
  skinTone: ["", "Very Light", "Light", "Light Medium", "Medium", "Golden Medium", "Tan", "Brown", "Deep Brown", "Dark", "Rich Ebony"],
  bodyType: ["", "Petite", "Short", "Average", "Curvy", "Plus Size", "Tall", "Slim", "Athletic", "Chunky Cute", "Abs", "Toned Body", "Slim Thick", "Hourglass Shape", "Defined Waist", "Broad Shoulders", "Curvy Hips", "Lean Build", "Muscular", "Soft Feminine Build", "Strong Feminine Build", "Petite Frame", "Voluptuous", "Fit Body", "Compact Build", "Model Build", "Thick Build", "Balanced Proportions", "Long Torso", "Short Torso", "Wide Frame"],
  hairType: ["", "Locs", "Braids", "Box Braids", "Twists", "Afro", "Puff Ponytail", "Curly", "Straight", "Wavy", "Bob", "Bun", "High Ponytail", "Fade", "Buzz Cut", "Silk Press", "Finger Waves", "Wig", "Half Up Half Down", "Messy Bun", "Long Layers", "Pixie Cut", "Blunt Cut", "Layered Cut", "Beach Waves", "Loose Curls", "Tight Curls", "Coily Hair", "Knotless Braids", "Micro Braids", "Cornrows", "Fulani Braids", "Halo Braid", "French Braid", "Dutch Braid", "Space Buns", "Double Ponytails", "Slick Back Bun", "Slick Ponytail", "Side Part", "Middle Part", "Crimped Hair", "Feathered Hair", "Voluminous Blowout", "Hollywood Waves", "Shag Cut", "Wolf Cut", "Mullet Style", "Undercut", "Mohawk", "Faux Hawk"],
  hairColor: ["", "Black", "Jet Black", "Soft Black", "Dark Brown", "Chocolate Brown", "Brown", "Light Brown", "Ash Brown", "Golden Brown", "Caramel", "Honey Blonde", "Blonde", "Platinum Blonde", "Dirty Blonde", "Strawberry Blonde", "Auburn", "Copper", "Red", "Cherry Red", "Burgundy", "Wine Red", "Mahogany", "Rose Gold", "Pink", "Hot Pink", "Baby Pink", "Purple", "Lavender", "Violet", "Blue", "Royal Blue", "Navy Blue", "Teal", "Turquoise", "Mint Green", "Green", "Neon Green", "Silver", "Gray", "White Blonde", "Ombre Blonde", "Ombre Brown", "Ombre Pink", "Ombre Purple", "Ombre Blue", "Black to Blonde Ombre", "Brown to Caramel Ombre", "Rainbow Hair", "Split Dye (Half Black Half Color)", "Money Piece Highlights"],
  eyeShape: ["", "Round", "Almond", "Hooded", "Doe Eyes", "Big Sparkle Eyes", "Cat Eye", "Monolid", "Upturned", "Downturned", "Wide Set", "Close Set", "Deep Set", "Protruding", "Narrow", "Large Eyes", "Small Eyes", "Soft Round", "Sharp Almond", "Lifted Cat Eye", "Wide Open Eyes", "Heavy Lid", "Double Lid", "Single Lid", "Fox Eyes", "Doll Round", "Balanced Shape", "Symmetrical Eyes", "Asymmetrical Eyes", "Angled Eyes", "Straight Eyes", "Tilted Up Eyes", "Tilted Down Eyes", "Oval Eyes", "Long Eyes", "Short Eyes", "Defined Crease", "No Crease", "Natural Shape", "Exaggerated Shape", "Cute Chibi Eyes", "Bratz Shape", "Anime Shape", "Glassy Shape", "Soft Hooded", "Bold Cat Eye", "Classic Almond", "Wide Doll Eyes", "Sharp Wing Shape", "Rounded Cat Eye"],
  eyeColor: ["", "Brown", "Dark Brown", "Hazel", "Green", "Blue", "Gray", "Amber", "Golden"],
  facialFeatures: ["", "Freckles", "Dimples", "Long Lashes", "Glossy Lips", "Beauty Mark", "Soft Cheeks", "Defined Brows", "Round Cheeks", "Heart Shaped Face", "High Cheekbones", "Full Lips", "Plump Lips", "Small Lips", "Wide Smile", "Gap Tooth Smile", "Perfect Smile", "Sharp Jawline", "Soft Jawline", "Oval Face", "Square Face", "Round Face", "Diamond Face Shape", "Chiseled Face", "Baby Face", "Youthful Face", "Mature Face", "Blushed Cheeks", "Rosy Cheeks", "Highlighted Cheekbones", "Contoured Face", "Natural Face", "Smooth Face", "Glowing Face", "Radiant Face", "Doll Face", "Bratz Face", "Chibi Face", "Anime Face", "Symmetrical Face", "Asymmetrical Beauty", "Soft Glam Face", "Full Glam Face", "Bare Face", "Innocent Look", "Bold Look", "Cute Expression", "Serious Look", "Elegant Face", "Luxury Face"],
  facialHair: ["", "Beard", "Full Beard", "Goatee", "Mustache", "Light Stubble", "Heavy Stubble", "Short Beard", "Long Beard", "Trimmed Beard", "Boxed Beard", "Circle Beard", "Van Dyke", "Anchor Beard", "Balbo Beard", "Chin Strap", "Soul Patch", "Handlebar Mustache", "Chevron Mustache", "Pencil Mustache", "Fu Manchu"],
  makeupStyle: ["", "Luxury", "Everyday", "Soft Glam", "Full Glam", "Natural", "Bold Glam", "Princess Glam", "Glossy Doll Makeup", "No Makeup Makeup", "Dewy Glow", "Matte Glam", "Bronzed Glam", "Sunset Glam", "Rose Gold Glam", "Smokey Eye Glam", "Cut Crease", "Halo Eye", "Graphic Liner", "Fox Eye Makeup", "Vintage Glam", "Hollywood Glam", "Runway Editorial", "High Fashion", "K-Beauty Soft", "Clean Girl Aesthetic", "Glass Skin Makeup", "Airbrushed Glam", "Monochrome Makeup", "Color Block Makeup", "Neon Pop Makeup", "Festival Glitter", "Rhinestone Glam", "Y2K Glam", "90s Supermodel", "Soft Pastel Glam", "Candy Glam", "Icy Glam", "Golden Goddess", "Beachy Glow", "Bridal Soft Glam", "Prom Glam", "Night Out Glam", "Day to Night Glam", "Dramatic Lashes", "Natural Lashes", "Winged Liner Focus", "Bold Lip Focus", "Freckled Makeup", "Doll Blush Makeup"],
  makeupColor: ["", "Gold", "Pink", "Rose Gold", "Nude", "Berry", "Purple", "Soft Peach", "Red", "Coral", "Plum", "Wine", "Chocolate", "Caramel", "Bronze", "Copper", "Champagne", "Ivory", "Mocha", "Terracotta", "Burnt Orange", "Magenta", "Fuchsia", "Hot Pink", "Baby Pink", "Lavender", "Lilac", "Violet", "Royal Purple", "Sky Blue", "Navy Blue", "Teal", "Turquoise", "Mint", "Emerald", "Olive", "Silver", "Gunmetal", "Black", "White", "Holographic", "Iridescent", "Glitter Mix", "Shimmer Mix", "Pastel Mix", "Rainbow Blend", "Sunset Blend", "Ombre Pink", "Ombre Purple", "Ombre Gold", "Dual Tone (Pink & Gold)", "Dual Tone (Purple & Blue)", "Tri Color Blend", "Neon Mix"],
  nailStyle: ["", "Short Glossy Nails", "Long Coffin Nails", "French Tips", "Glitter Nails", "Luxury Rhinestone Nails", "Pink Ombre Nails", "Designer Nails", "Matte Nails", "Glossy Gel Nails", "Acrylic Nails", "Gel-X Nails", "Dip Powder Nails", "Stiletto Nails", "Square Nails", "Almond Nails", "Round Nails", "Oval Nails", "Ballerina Nails", "Coffin Extra Long", "Short Square", "Short Almond", "Chrome Nails", "Mirror Chrome", "Holographic Nails", "Foil Nails", "Marble Nails", "Swirl Nails", "Abstract Art Nails", "Floral Nails", "Butterfly Nails", "Cow Print Nails", "Leopard Print Nails", "Aura Nails", "Jelly Nails", "Glazed Donut Nails", "3D Charms Nails", "Pearl Nails", "Gemstone Nails", "French Ombre", "Reverse French", "Color Block Nails", "Neon Nails", "Pastel Nails", "Milky White Nails", "Nude Pink Nails", "Black Gloss Nails", "Gold Accent Nails", "Silver Accent Nails"],
  outfit: ["", "Streetwear", "Luxury", "Casual", "Business Casual", "Birthday Outfit", "Ballerina Outfit", "School Uniform", "Church Outfit", "Nurse Scrubs", "Princess Dress", "Denim Mix", "Pajamas", "Sporty Wear", "Y2K Fashion", "Futuristic Fashion", "Hip Hop Glam Outfit"],
  pattern: ["", "Plain", "Rainbow", "Cow Print", "Plaid", "Leopard", "Floral", "Glitter", "Denim", "Hearts", "Stars", "Butterflies", "Clouds"],
  shoeType: ["", "Sneakers", "Heels", "Boots", "Thigh High Boots", "Dress Shoes", "Sandals", "Slippers", "Flats", "Platform Shoes"],
  vibe: ["", "Whimsical", "Luxury", "Trendy", "Girly", "Soft Girl", "Bold and Pretty", "High-End Boutique", "Cute Personality", "Playful", "Classroom Fun"],
  finish: ["", "Transparent PNG", "White Outline Sticker", "Die Cut Sticker", "Glossy Finish Skin", "Clean Edges", "Premium Seller Detail"],
  pose: ["", "Standing","Sitting","Walking","Leaning Against Wall","Hands on Hips","Arms Crossed","One Hand in Pocket","Both Hands in Pockets","Over the Shoulder Look","Looking Back","Squatting","Kneeling","Lying Down","Jumping","Dancing","Twirling","One Leg Up","Kicking Foot Up","Sitting Cross-Legged","Sitting on Edge","Sitting on Floor","Sitting on Chair","Sitting on Bed","Laying on Side","Laying on Back","Laying on Stomach","Stretching","Hair Flip Pose","Holding Hair","Playing with Hair","Hand on Chin","Thinking Pose","Selfie Pose","Peace Sign Pose","Blowing Kiss Pose","Pointing Forward","Waving","Hugging Self","Covering Face Cute","Peekaboo Pose","Hands Behind Back","Arms Up Pose","Reaching Forward","Looking Up","Looking Down","Side Profile Pose","Power Pose","Model Walk Pose","Runway Pose","Boss Babe Pose"],
  expression: ["", "Happy Smile","Big Smile","Soft Smile","Closed Mouth Smile","Open Mouth Smile","Laughing","Smirk","Confident","Bold","Fierce","Serious","Neutral Face","Relaxed Face","Focused","Determined","Sad","Crying","Teary Eyes","Angry","Annoyed","Confused","Shocked","Surprised","Wide Eyes","Wink","Kiss Face","Blowing Kiss","Pouty Lips","Duck Face","Flirty Look","Seductive Look","Dreamy Look","Innocent Look","Cute Expression","Playful","Silly Face","Tongue Out","Cheeky Smile","Eye Roll","Side Eye","Raised Eyebrow","Nervous Smile","Shy Look","Blushing","Proud","Calm","Peaceful","Sleepy","Tired","Excited"],
  cameraAngle: ["", "Full Body","Wide Shot","Front View","Close Up","Three Quarter View","Top View","Side View","Low Angle","Hero Angle","High Angle","Eye Level","Overhead Shot","Bird's Eye View","Worm's Eye View","Dutch Angle","Tilted Frame","Extreme Close Up","Medium Shot","Long Shot","Profile Close Up","Back View","Over the Shoulder Shot","Mirror Shot","Reflection Shot","Framed Through Object","Foreground Blur","Depth of Field Shot","Bokeh Focus","Zoomed In","Zoomed Out","Action Shot","Freeze Motion Shot","Panning Shot","Tracking Shot","Centered Composition","Off-Center Composition","Rule of Thirds","Symmetry Shot","Asymmetrical Shot","Leading Lines Shot","Silhouette Angle","Shadow Focus Shot","POV Shot","Selfie Angle","Cinematic Angle","Fashion Editorial Angle","Runway Angle","Portrait Studio Shot","Lifestyle Shot","Street Style Shot"],
  lighting: ["", "Bright Daylight","Soft Studio Lighting","Cinematic Lighting","Clean Product Lighting","Golden Hour","Pastel Glow","Luxury Shine","Natural Light","Soft Window Light","Harsh Light","High Contrast Lighting","Low Key Lighting","High Key Lighting","Backlighting","Front Lighting","Side Lighting","Top Lighting","Under Lighting","Rim Lighting","Edge Lighting","Spotlight","Studio Flash","Ring Light","Beauty Dish Lighting","Softbox Lighting","Diffused Light","Ambient Light","Moody Lighting","Dark Lighting","Warm Lighting","Cool Lighting","Neon Lighting","Colored Gel Lighting","Pink Glow Lighting","Purple Glow Lighting","Blue Glow Lighting","Sunset Lighting","Sunrise Lighting","Night Lighting","City Lights","Street Light Glow","Candle Light","Fire Light","Glowing Aura Lighting","Fantasy Glow","Holographic Lighting","Reflective Lighting","Shimmer Lighting","Glossy Highlight Lighting","Dramatic Shadow Lighting"],
  background: ["", "Transparent Background","Bedroom Scene","Classroom","Birthday Party","Luxury Studio","Pastel Background","Rainbow Backdrop","Outdoor Park","Doll Box Backdrop","Futuristic Room","Red Room","Blue Room","Pink Room","Purple Room","Black Luxury Room","White Minimal Room","90s Bedroom","2000s Bedroom","Y2K Room","Aesthetic Bedroom","Teen Bedroom","Kids Room","Dorm Room","Living Room","Modern Apartment","Luxury Penthouse","Hotel Room","Beach Scene","Tropical Island","Poolside","City Street","Downtown Night","Rooftop View","Garden Scene","Flower Field","Fairy Garden","Cottagecore Room","Boho Room","Vintage Room","Retro Arcade","Mall Scene","Coffee Shop","Office Space","Runway Stage","Photoshoot Studio","Neon Room","Cyberpunk City","Space Galaxy","Cloud Heaven","Winter Snow Scene","Fall Leaves Scene"],
  colorPalette: ["", "Princess Pink", "Warm Sunset", "Pastels", "Bold Brights", "Pink and Gold", "Blue and Silver", "Rainbow Pop", "Neutral Luxe", "Purple Dream"],
  profession: ["", "Student","Teacher","Nurse","Doctor","Pastor","Content Creator","Business Owner","Party Planner","Chef","Artist","Fashion Designer","Mom","Birthday Girl","Lawyer","Judge","Police Officer","Firefighter","Paramedic","Dentist","Pharmacist","Therapist","Psychologist","Social Worker","Engineer","Architect","Interior Designer","Graphic Designer","Photographer","Videographer","Makeup Artist","Hair Stylist","Barber","Real Estate Agent","Entrepreneur","Accountant","Banker","Financial Advisor","Marketing Manager","Sales Executive","HR Manager","Receptionist","Flight Attendant","Pilot","Truck Driver","Electrician","Plumber","Construction Worker","Security Guard","Personal Trainer","Fitness Coach","Influencer","Model","Actor","Singer","DJ","Event Coordinator"],
  inclusiveDetail: ["", "Wheelchair User", "Autistic Awareness Theme", "Sensory Friendly Theme", "Hearing Aid", "Prosthetic Leg", "Service Dog", "Accessible Fashion Detail", "Adaptive Outfit Detail"],
  petType: ["", "Dog","Cat","Puppy","Kitten","Bunny","Rabbit","Hamster","Guinea Pig","Ferret","Parrot","Bird","Canary","Cockatiel","Macaw","Fish","Goldfish","Betta Fish","Turtle","Tortoise","Snake","Lizard","Gecko","Chameleon","Frog","Hedgehog","Chinchilla","Sugar Glider","Mouse","Rat","Horse","Pony","Goat","Pig","Mini Pig","Cow","Sheep","Deer","Fox","Wolf","Raccoon","Panda","Koala","Unicorn Pet","Dragon Pet","Dinosaur Pet","Stuffed Animal Pet","Robot Pet","Fantasy Creature","Bear","Poodle"],
  petStyle: ["", "Cute","Luxury","Fantasy","Matching Outfit","Glitter Pet","Soft Plush Look","Designer Pet","Fluffy Pet","Short Hair Pet","Long Hair Pet","Curly Fur","Straight Fur","Spotted Fur","Striped Fur","Colorful Fur","Pastel Pet","Neon Pet","Shiny Coat","Matte Coat","Cartoon Pet","Realistic Pet","Hyper Realistic Pet","Chibi Pet","Bratz Style Pet","Doll Style Pet","Mini Pet","Giant Pet","Baby Pet","Royal Pet","Princess Pet","King Pet","Street Style Pet","Sporty Pet","Sleepy Pet","Playful Pet","Happy Pet","Angry Pet","Cute Eyes Pet","Big Head Pet","Tiny Body Pet","Stylish Pet","Trendy Pet","High Fashion Pet","Celebrity Pet","Matching Owner Style","Winter Style Pet","Summer Style Pet","Holiday Pet","Festive Pet","Sparkle Pet"],
  petAccessory: ["", "Bow Collar","Mini Crown","Pet Handbag","Glitter Leash","Luxury Collar","Matching Shoes","Bandana","Pet Sunglasses","Pet Hat","Pet Hoodie","Pet Jacket","Pet Sweater","Pet Dress","Pet Tutu","Pet Bow Tie","Pet Scarf","Pet Boots","Pet Backpack","Pet Necklace","Pet Charm Collar","Pet Harness","Pet Costume","Pet Cape","Pet Wings","Pet Crown","Pet Tiara","Pet Jewelry","Pet Blanket","Pet Pillow","Pet Bed","Pet Toy","Pet Ball","Pet Plush Toy","Pet Treat Bag","Pet Food Bowl","Pet Water Bowl","Pet Carrier","Pet Stroller","Pet Seatbelt","Pet Raincoat","Pet Pajamas","Pet Party Hat","Pet Birthday Outfit","Pet Glasses","Pet Band","Pet Bell Collar","Pet ID Tag","Pet LED Collar","Pet Fashion Set","Pet Luxury Set"],
};

const ACCESSORY_OPTIONS = ["Watch","Sunglasses","Bow","Earrings","Necklace","Backpack","Handbag","Bible","Gift Box","Balloon","Phone","Handcuffs","Bracelet","Tiara","Charm Necklace","Fishnet Stockings","Designer Belt","Luxury Purse","Anklet","Body Chain","Waist Beads","Headband","Hair Clips","Hair Scarf","Bandana","Bucket Hat","Baseball Cap","Beanie","Beret","Fedora","Gloves","Fingerless Gloves","Arm Sleeves","Leg Warmers","Socks High","Knee High Socks","Thigh High Socks","Choker","Layered Chains","Pendant Necklace","Hoop Earrings","Stud Earrings","Statement Earrings","Smart Watch","Crossbody Bag","Mini Backpack","Clutch","Evening Bag","Laptop Bag","Makeup Bag"];
const PROP_OPTIONS = ["Coffee Cup","Laptop","Microphone","Shopping Bags","Flowers","Cake","Stethoscope","Notebook","Puzzle Piece","Toy","Gift Bag","Camera","Ring Light","Stuffed Animal","Candy","Ice Cream","Book","Magazine","Headphones","Speaker","Game Controller","VR Headset","Yoga Mat","Dumbbells","Water Bottle","Wine Glass","Champagne Glass","Cocktail","Umbrella","Parasol","Skateboard","Bicycle","Car Keys","Suitcase","Passport","Map","Paint Brush","Easel","Palette","DJ Deck","Turntable","Keyboard Piano","Guitar","Violin","Drumsticks","Makeup Brush Set","Perfume Bottle","Hair Dryer","Flat Iron","Curling Wand"];
const DETAIL_OPTIONS = ["Realistic Face Detail","Glossy Finish","Cute Personality","Clean Edges","Premium Seller Detail","Polished Lighting","Standout Sticker Appeal","High Detail","Print Ready","Rhinestone Glam","Seller Ready","Luxury Finish","Soft Glow Effect","Ultra Sharp Detail","HD Quality","4K Detail","Hyper Realistic Skin","Cartoon Finish","3D Render Look","Studio Quality","Editorial Finish","Magazine Ready","Perfect Symmetry","Flawless Skin","Glass Skin Effect","Doll-Like Finish","Bratz Style Finish","Chibi Style Finish","Smooth Shading","Detailed Hair Strands","Defined Features","High Contrast Detail","Soft Blending","Sharp Edges","Glow Outline","White Outline Sticker","Shadow Depth","Light Reflection","Texture Detail","Fabric Detail","Jewelry Shine","Metallic Shine","Glitter Effect","Sparkle Highlights","Color Pop Effect","Vibrant Colors","Muted Tone Style","Aesthetic Filter","Vintage Filter","Luxury Aesthetic"];

const SECTIONS = [
  {
    title: "Basic Details",
    fields: ["subjectType", "ageGroup", "imageCount", "artStyle", "skinTone", "bodyType", "race"],
  },
  {
    title: "Hair and Beauty",
    fields: ["hairType", "hairColor", "hairLength", "eyeShape", "eyeStyle", "eyeColor", "facialFeatures", "facialHair", "makeupStyle", "makeupColor", "lipColor", "nailStyle", "skinFinish", "piercings", "lipStyle", "eyebrowStyle", "noseStyle", "tattooStyle", "hairDetails", "teethStyle"],
  },
  {
    title: "Clothing and Styling",
    fields: ["outfit", "pattern", "shoeType", "vibe", "finish", "outfitStyle", "pantsStyle", "topStyle", "shoeStyle", "brandShoes", "brandPurse", "designerGlasses", "outfitAccessories", "jewelry"],
  },
  {
    title: "Pose and Scene",
    fields: ["pose", "expression", "cameraAngle", "lighting", "background", "colorPalette", "scenario", "action"],
  },
  {
    title: "Profession and Inclusion",
    fields: ["profession", "inclusiveDetail"],
  },
  {
    title: "Pets",
    fields: ["petType", "petStyle", "petAccessory", "dogBreed", "catBreed", "petSize"],
  },
];

const LABELS = {
  race: "Race / Ethnicity",
  scenario: "Scenario",
  action: "Action",
  jewelry: "Jewelry",
  teethStyle: "Teeth Style",
  lipColor: "Lip Color",
  outfitAccessories: "Outfit Accessories",
  hairDetails: "Hair Details",
  hairLength: "Hair Length",
  tattooStyle: "Tattoo Style",
  dogBreed: "Dog Breed",
  catBreed: "Cat Breed",
  petSize: "Pet Size",
  designerGlasses: "Designer Glasses",
  brandShoes: "Brand Shoes",
  brandPurse: "Brand Purse",
  outfitStyle: "Outfit Style",
  pantsStyle: "Pants / Bottoms",
  topStyle: "Tops / Shirts",
  shoeStyle: "Shoes",
  lipStyle: "Lip Style",
  eyebrowStyle: "Eyebrow Style",
  noseStyle: "Nose Style",
  piercings: "Face Piercings",
  eyeStyle: "Eye Style",
  skinFinish: "Skin Finish",
  subjectType: "Subject Type",
  ageGroup: "Age Group",
  imageCount: "Image Count",
  artStyle: "Art Style",
  skinTone: "Skin Tone",
  bodyType: "Body Type",
  hairType: "Hair Type",
  hairColor: "Hair Color",
  eyeShape: "Eye Shape",
  eyeColor: "Eye Color",
  facialFeatures: "Facial Features",
  facialHair: "Facial Hair",
  makeupStyle: "Makeup Style",
  makeupColor: "Makeup Color",
  nailStyle: "Nail Style",
  outfit: "Outfit",
  pattern: "Pattern",
  shoeType: "Shoe Type",
  vibe: "Vibe",
  finish: "Finish",
  pose: "Pose",
  expression: "Expression",
  cameraAngle: "Camera Angle",
  lighting: "Lighting",
  background: "Background",
  colorPalette: "Color Palette",
  profession: "Profession or Role",
  inclusiveDetail: "Inclusive Detail",
  petType: "Pet Type",
  petStyle: "Pet Style",
  petAccessory: "Pet Accessory",
};

const MAX_MULTI = 6;

const initialForm = Object.fromEntries(Object.keys(SELECT_OPTIONS).map((key) => [key, ""]));

function MultiSelectBox({ title, options, selected, onToggle, note }) {
  return (
    <>
      <div className="section-title">{title}</div>
      <div className="multi-box">
        <div className="multi-grid">
          {options.map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => onToggle(option)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>
      <div className="note">{note}</div>
    </>
  );
}

export default function UltimateDollGenerator() {
  
  const [favorites, setFavorites] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [accessories, setAccessories] = useState([]);
  const [props, setProps] = useState([]);
  const [details, setDetails] = useState([]);
  const [extraNotes, setExtraNotes] = useState("");
  const [output, setOutput] = useState("Your prompt will appear here.");
  const [copyMessage, setCopyMessage] = useState("");

  const toggleLimitedSelection = (value, selected, setter) => {
    if (selected.includes(value)) {
      setter(selected.filter((item) => item !== value));
      return;
    }
    if (selected.length >= MAX_MULTI) {
      setCopyMessage(`You can only choose up to ${MAX_MULTI} options here.`);
      return;
    }
    setter([...selected, value]);
  };

  const addPart = (parts, label, value) => {
    if (value) parts.push(`${label}: ${value}`);
  };

  const generatedPrompt = useMemo(() => {
    const parts = [];
    Object.entries(LABELS).forEach(([key, label]) => addPart(parts, label, form[key]));
    if (accessories.length) parts.push(`Accessories: ${accessories.join(", ")}`);
    if (props.length) parts.push(`Props: ${props.join(", ")}`);
    if (details.length) parts.push(`Extra Character Details: ${details.join(", ")}`);
    if (extraNotes.trim()) parts.push(`Extra Prompt Notes: ${extraNotes.trim()}`);

    if (!parts.length) return "Please choose some options first.";

    return (
      "Create a premium seller-ready doll character design with the following details:\n\n" +
      parts.join(".\n") +
      ".\n\nAdd polished lighting, clean edges, strong detail, and standout visual appeal."
    );
  }, [form, accessories, props, details, extraNotes]);

  const handleGenerate = () => {
    setOutput(generatedPrompt);
    setCopyMessage("");
  };

  const addToFavorites = () => {
    if (!output || output.includes("Your prompt") || output.includes("Please choose")) return;
    if (favorites.length >= 6) {
      setCopyMessage("You can only save up to 6 favorites.");
      return;
    }
    setFavorites([...favorites, output]);
    setCopyMessage("Saved to favorites.");
  };

  const clearFavorites = () => {
    setFavorites([]);
    setCopyMessage("Favorites cleared.");
  };

  const handleClear = () => {
    setForm(initialForm);
    setAccessories([]);
    setProps([]);
    setDetails([]);
    setExtraNotes("");
    setOutput("Your prompt will appear here.");
    setCopyMessage("");
  };

  const handleRandomize = () => {
    const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const newForm = {};
    Object.keys(SELECT_OPTIONS).forEach((k) => {
      const opts = SELECT_OPTIONS[k];
      newForm[k] = opts.length ? rand(opts) : "";
    });
    setForm(newForm);
    const pickMany = (list) => [...list].sort(() => 0.5 - Math.random()).slice(0, Math.min(3, list.length));
    setAccessories(pickMany(ACCESSORY_OPTIONS));
    setProps(pickMany(PROP_OPTIONS));
    setDetails(pickMany(DETAIL_OPTIONS));
    setCopyMessage("Randomized selections applied.");
  };

  const handleCopy = async () => {
    if (!output || output === "Your prompt will appear here." || output === "Please choose some options first.") {
      setCopyMessage("Generate a prompt first.");
      return;
    }

    try {
      await navigator.clipboard.writeText(output);
      setCopyMessage("Prompt copied.");
    } catch {
      setCopyMessage("Copy did not work on this device. You can still highlight and copy manually.");
    }
  };

  return (
    <div className="page-shell">
      <style>{`
        * { box-sizing: border-box; }
        :root {
          --bg1: #ffd6f4;
          --bg2: #d8b4fe;
          --card: rgba(255,255,255,0.96);
          --text: #5a2578;
          --accent2: #a855f7;
          --accent3: #f472b6;
          --shadow: 0 16px 40px rgba(130, 52, 170, 0.18);
        }
        .page-shell {
          margin: 0;
          font-family: Arial, sans-serif;
          background: linear-gradient(135deg, var(--bg1), var(--bg2));
          color: var(--text);
          padding: 20px;
          min-height: 100vh;
        }
        .wrap {
          max-width: 1280px;
          margin: 0 auto;
          background: var(--card);
          border-radius: 26px;
          box-shadow: var(--shadow);
          overflow: hidden;
          border: 2px solid rgba(255,255,255,0.7);
        }
        .hero {
          padding: 26px 24px 20px;
          background:
            radial-gradient(circle at top left, rgba(255,255,255,0.85), transparent 35%),
            linear-gradient(135deg, rgba(255,255,255,0.55), rgba(255,255,255,0.2)),
            linear-gradient(135deg, #ffb5e8, #d8b4fe 55%, #f9a8d4);
          border-bottom: 2px solid #f6d4ff;
        }
        h1 {
          margin: 0;
          text-align: center;
          font-size: 2.2rem;
          color: #8626b5;
          font-weight: 800;
          letter-spacing: 0.4px;
        }
        .sub {
          text-align: center;
          margin-top: 10px;
          color: #7a3f99;
          font-size: 0.98rem;
          line-height: 1.5;
        }
        .content { padding: 22px; }
        .section-title {
          margin: 26px 0 14px;
          font-size: 1.12rem;
          font-weight: 800;
          color: #9129c6;
          padding: 10px 14px;
          border-radius: 14px;
          background: linear-gradient(135deg, #fff1fb, #f5e7ff);
          border: 1px solid #efd2ff;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 14px;
        }
        .field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        label {
          font-weight: 700;
          color: #7c2ea6;
          font-size: 0.95rem;
        }
        select, textarea {
          width: 100%;
          padding: 12px 13px;
          border-radius: 14px;
          border: 1px solid #e7c4f6;
          background: #fff;
          color: var(--text);
          font-size: 0.95rem;
          outline: none;
        }
        textarea {
          min-height: 120px;
          resize: vertical;
        }
        select:focus, textarea:focus {
          border-color: #d946ef;
          box-shadow: 0 0 0 3px rgba(217, 70, 239, 0.12);
        }
        .wide { grid-column: 1 / -1; }
        .multi-box {
          background: linear-gradient(135deg, #fff8fd, #fcf2ff);
          border: 1px solid #efcffc;
          border-radius: 18px;
          padding: 14px;
          max-height: 220px;
          overflow-y: auto;
        }
        .multi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
          gap: 8px 14px;
        }
        .multi-box label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 500;
          color: #5f347b;
          margin: 0;
          background: rgba(255,255,255,0.6);
          padding: 8px 10px;
          border-radius: 12px;
          border: 1px solid rgba(239, 207, 252, 0.8);
        }
        .note {
          margin-top: 8px;
          color: #875aa1;
          font-size: 0.84rem;
        }
        .actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 24px;
        }
        button {
          border: none;
          border-radius: 16px;
          padding: 14px 18px;
          font-size: 1rem;
          font-weight: 800;
          cursor: pointer;
          transition: transform 0.15s ease, opacity 0.15s ease;
        }
        button:hover {
          transform: translateY(-1px);
          opacity: 0.95;
        }
        .btn-main {
          background: linear-gradient(135deg, var(--accent3), var(--accent2));
          color: #fff;
          box-shadow: 0 10px 18px rgba(189, 71, 214, 0.22);
        }
        .btn-soft {
          background: linear-gradient(135deg, #fce7f3, #f3e8ff);
          color: #7a2aa6;
          border: 1px solid #efcffb;
        }
        .output {
          margin-top: 22px;
          background: linear-gradient(135deg, #fff7fc, #faf3ff);
          border: 1px solid #eccffd;
          border-radius: 20px;
          padding: 18px;
          min-height: 140px;
          white-space: pre-wrap;
          line-height: 1.7;
          color: #5b2878;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.7);
        }
        .footer-note {
          margin-top: 10px;
          color: #84579d;
          font-size: 0.85rem;
        }
        .status {
          margin-top: 12px;
          color: #7a2aa6;
          font-weight: 700;
        }
        .checks {
          margin-top: 18px;
          padding: 14px;
          border-radius: 18px;
          background: #fff8fd;
          border: 1px solid #efcffc;
        }
        .checks h3 {
          margin: 0 0 10px;
          color: #7c2ea6;
          font-size: 1rem;
        }
        .checks ul {
          margin: 0;
          padding-left: 18px;
        }
        @media (max-width: 700px) {
          .page-shell { padding: 10px; }
          .content { padding: 14px; }
          h1 { font-size: 1.75rem; }
        }
      `}</style>

      <div className="wrap">
        <div className="hero">
          <h1>Ultimate Doll Generator</h1>
          <div style={{ textAlign: "center", color: "#7a3f99", fontWeight: 700, marginTop: "6px" }}>by Lisa Porter</div>
          <div className="sub">
            Build detailed premium doll prompts with luxury pink and purple styling, multi-select options, disability details,
            pets, nails, extra art styles, and seller-ready output.
          </div>
        </div>

        <div className="content">
          {SECTIONS.map((section) => (
            <React.Fragment key={section.title}>
              <div className="section-title">{section.title}</div>
              <div className="grid">
                {section.fields.map((field) => (
                  <div className="field" key={field}>
                    <label htmlFor={field}>{LABELS[field] || field}</label>
                    <select
                      id={field}
                      value={form[field]}
                      onChange={(e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))}
                    >
                      {(SELECT_OPTIONS[field] || []).map((option) => (
                        <option key={option || "none"} value={option}>
                          {option || "None"}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </React.Fragment>
          ))}

          <MultiSelectBox
            title="Choose Up To 6 Accessories"
            options={ACCESSORY_OPTIONS}
            selected={accessories}
            onToggle={(value) => toggleLimitedSelection(value, accessories, setAccessories)}
            note="You can select up to 6 accessories."
          />

          <MultiSelectBox
            title="Choose Up To 6 Props"
            options={PROP_OPTIONS}
            selected={props}
            onToggle={(value) => toggleLimitedSelection(value, props, setProps)}
            note="You can select up to 6 props."
          />

          <MultiSelectBox
            title="Choose Up To 6 Extra Character Details"
            options={DETAIL_OPTIONS}
            selected={details}
            onToggle={(value) => toggleLimitedSelection(value, details, setDetails)}
            note="You can select up to 6 extra details."
          />

          <div className="section-title">Extra Prompt Notes</div>
          <div className="grid">
            <div className="field wide">
              <label htmlFor="extraNotes">Type Anything Extra</label>
              <textarea
                id="extraNotes"
                placeholder="Add any extra prompt details here..."
                value={extraNotes}
                onChange={(e) => setExtraNotes(e.target.value)}
              />
            </div>
          </div>

          <div className="actions">
            <button className="btn-soft" onClick={addToFavorites}>Save to Favorites</button>
            <button className="btn-soft" onClick={handleRandomize}>Randomize</button>
            <button className="btn-main" onClick={handleGenerate}>Generate Prompt</button>
            <button className="btn-soft" onClick={handleCopy}>Copy Prompt</button>
            <button className="btn-soft" onClick={handleClear}>Clear All</button>
          </div>

          {copyMessage ? <div className="status">{copyMessage}</div> : null}

          <div className="output">{output}</div>

          <div className="section-title">Favorites (Up to 6)</div>
          <div className="multi-box">
            {favorites.length === 0 && <div className="note">No saved prompts yet.</div>}
            {favorites.map((fav, i) => (
              <div key={i} style={{marginBottom: "10px", fontSize: "0.85rem"}}>
                {fav}
              </div>
            ))}
          </div>
          <div className="actions">
            <button className="btn-soft" onClick={clearFavorites}>Reset Favorites</button>
          </div>
          <div className="footer-note">© Lisa Porter — Ultimate Doll Generator</div>
        </div>
      </div>
    </div>
  );
}
