-- Sri Pavani Kaikani Commission - Fix Tamil Charset & Mojibake
SET NAMES utf8mb4;

-- 1. Fix company settings
UPDATE settings SET `value` = 'ஸ்ரீ பவானி காய்கனி கமிஷன் வியாபாரம்' WHERE `key` = 'company_name_ta';
UPDATE settings SET `value` = 'காய்கனி கமிஷன் வியாபாரம்' WHERE `key` = 'company_tagline';
UPDATE settings SET `value` = 'பவானி சங்கர்' WHERE `key` = 'proprietor_name';
UPDATE settings SET `value` = 'தினசரி மார்க்கெட்' WHERE `key` = 'address_line1';
UPDATE settings SET `value` = 'சுரண்டை.' WHERE `key` = 'address_line2';
UPDATE settings SET `value` = 'ஸ்ரீ பவானி அம்மன் துணை' WHERE `key` = 'god_name_1';
UPDATE settings SET `value` = 'ஸ்ரீ பொட்டல் மாடசாமி' WHERE `key` = 'god_name_2';
UPDATE settings SET `value` = 'நன்றி! மீண்டும் வருக! • Thank You! Visit Again!' WHERE `key` = 'footer_note';

-- 2. Fix payment methods
UPDATE payment_methods SET `name_ta` = 'கடன்' WHERE `name_en` = 'Credit';
UPDATE payment_methods SET `name_ta` = 'பணம்' WHERE `name_en` = 'Cash';
UPDATE payment_methods SET `name_ta` = 'UPI' WHERE `name_en` = 'UPI';
UPDATE payment_methods SET `name_ta` = 'நெட் பேங்கிங்' WHERE `name_en` = 'Net Banking';

-- 3. Fix all standard items
UPDATE items SET `name_ta` = 'தக்காளி' WHERE `name_en` = 'Tomato' OR `code` = 'A';
UPDATE items SET `name_ta` = 'வெண்டைக்காய்' WHERE `name_en` = 'Ladies Finger' OR `code` = 'B';
UPDATE items SET `name_ta` = 'மிளகாய்' WHERE `name_en` = 'Chilli' OR `code` = 'C';
UPDATE items SET `name_ta` = 'பச்சை மிளகாய்' WHERE `name_en` = 'Green Chilli' OR `code` = 'D';
UPDATE items SET `name_ta` = 'கருவேப்பிலை' WHERE `name_en` = 'Curry Leaves' OR `code` = 'E';
UPDATE items SET `name_ta` = 'மாங்காய்' WHERE `name_en` = 'Raw Mango' OR `code` = 'F';
UPDATE items SET `name_ta` = 'வரி கத்தரி' WHERE `name_en` = 'Striped Brinjal' OR `code` = 'G';
UPDATE items SET `name_ta` = 'கத்தரிக்காய்' WHERE `name_en` = 'Brinjal' OR `code` = 'H';
UPDATE items SET `name_ta` = 'வெங்காயம்' WHERE `name_en` = 'Onion' OR `code` = 'I';
UPDATE items SET `name_ta` = 'கொத்து வெங்காயம்' WHERE `name_en` = 'Spring Onion' OR `code` = 'J';
UPDATE items SET `name_ta` = 'உருளைக்கிழங்கு' WHERE `name_en` = 'Potato' OR `code` = 'K';
UPDATE items SET `name_ta` = 'கேரட்' WHERE `name_en` = 'Carrot' OR `code` = 'L';
UPDATE items SET `name_ta` = 'பீன்ஸ்' WHERE `name_en` = 'Beans' OR `code` = 'M';
UPDATE items SET `name_ta` = 'முருங்கைக்காய்' WHERE `name_en` = 'Drumstick' OR `code` = 'N';
UPDATE items SET `name_ta` = 'முருங்கை இலை' WHERE `name_en` = 'Drumstick Leaves' OR `code` = 'O';
UPDATE items SET `name_ta` = 'அவரைக்காய்' WHERE `name_en` = 'Avarai Beans' OR `code` = 'P';
UPDATE items SET `name_ta` = 'பாகற்காய்' WHERE `name_en` = 'Bitter Gourd' OR `code` = 'Q';
UPDATE items SET `name_ta` = 'புடலங்காய்' WHERE `name_en` = 'Ridge Gourd' OR `code` = 'R';
UPDATE items SET `name_ta` = 'பீர்க்கங்காய்' WHERE `name_en` = 'Snake Gourd' OR `code` = 'S';
UPDATE items SET `name_ta` = 'சுரைக்காய்' WHERE `name_en` = 'Bottle Gourd' OR `code` = 'T';
UPDATE items SET `name_ta` = 'பூசணிக்காய்' WHERE `name_en` = 'Pumpkin' OR `code` = 'U';
UPDATE items SET `name_ta` = 'வெள்ளைப்பூசணி' WHERE `name_en` = 'Ash Gourd' OR `code` = 'V';
UPDATE items SET `name_ta` = 'வெள்ளரிக்காய்' WHERE `name_en` = 'Cucumber' OR `code` = 'W';
UPDATE items SET `name_ta` = 'கோவைக்காய்' WHERE `name_en` = 'Ivy Gourd' OR `code` = 'X';
UPDATE items SET `name_ta` = 'கொத்தவரங்காய்' WHERE `name_en` = 'Cluster Beans' OR `code` = 'Y';
UPDATE items SET `name_ta` = 'முள்ளங்கி' WHERE `name_en` = 'Radish' OR `code` = 'Z';
UPDATE items SET `name_ta` = 'பீட்ரூட்' WHERE `name_en` = 'Beetroot' OR `code` = 'AA';
UPDATE items SET `name_ta` = 'காலிஃபிளவர்' WHERE `name_en` = 'Cauliflower' OR `code` = 'AB';
UPDATE items SET `name_ta` = 'முட்டைக்கோஸ்' WHERE `name_en` = 'Cabbage' OR `code` = 'AC';
UPDATE items SET `name_ta` = 'கொத்தமல்லி' WHERE `name_en` = 'Coriander Leaves' OR `code` = 'AD';
UPDATE items SET `name_ta` = 'புதினா' WHERE `name_en` = 'Mint Leaves' OR `code` = 'AE';
UPDATE items SET `name_ta` = 'கீரை' WHERE `name_en` = 'Greens' OR `code` = 'AF';
UPDATE items SET `name_ta` = 'இஞ்சி' WHERE `name_en` = 'Ginger' OR `code` = 'AG';
UPDATE items SET `name_ta` = 'பூண்டு' WHERE `name_en` = 'Garlic' OR `code` = 'AH';
UPDATE items SET `name_ta` = 'வாழைக்காய்' WHERE `name_en` = 'Raw Banana' OR `code` = 'AI';
UPDATE items SET `name_ta` = 'வாழைப்பூ' WHERE `name_en` = 'Banana Flower' OR `code` = 'AJ';
UPDATE items SET `name_ta` = 'சேப்பங்கிழங்கு' WHERE `name_en` = 'Colocasia' OR `code` = 'AK';
UPDATE items SET `name_ta` = 'மரவள்ளிக்கிழங்கு' WHERE `name_en` = 'Tapioca' OR `code` = 'AL';
UPDATE items SET `name_ta` = 'கருணைக்கிழங்கு' WHERE `name_en` = 'Elephant Yam' OR `code` = 'AM';
UPDATE items SET `name_ta` = 'மஞ்சள் கிழங்கு' WHERE `name_en` = 'Raw Turmeric' OR `code` = 'AN';
UPDATE items SET `name_ta` = 'சோளம்' WHERE `name_en` = 'Sweet Corn' OR `code` = 'AO';
UPDATE items SET `name_ta` = 'பட்டாணி' WHERE `name_en` = 'Green Peas' OR `code` = 'AP';
UPDATE items SET `name_ta` = 'லாரி வாடகை' WHERE `name_en` = 'Lorry Freight' OR `code` = 'AQ';
UPDATE items SET `name_ta` = 'கூலி' WHERE `name_en` = 'Cooli' OR `code` = 'AR';
INSERT INTO items (`code`, `name_en`, `name_ta`, `unit`, `default_rate`, `active`)
VALUES ('AS', 'Nelli', 'நெல்லிக்காய்', 'kg', 0.00, 1)
ON DUPLICATE KEY UPDATE `name_ta` = 'நெல்லிக்காய்';
UPDATE items SET `name_ta` = 'நெல்லிக்காய்' WHERE LOWER(`name_en`) IN ('nelli', 'amla');
UPDATE items SET `name_ta` = 'எலுமிச்சை' WHERE LOWER(`name_en`) IN ('lemon', 'lime');
UPDATE items SET `name_ta` = 'தேங்காய்' WHERE LOWER(`name_en`) = 'coconut';

-- 4. Fix existing bill_lines and purchase_lines historical data
UPDATE bill_lines SET `item_name_ta` = 'நெல்லிக்காய்' WHERE LOWER(TRIM(`item_name_en`)) IN ('nelli', 'amla');
UPDATE bill_lines SET `item_name_ta` = 'தக்காளி' WHERE LOWER(TRIM(`item_name_en`)) = 'tomato';
UPDATE bill_lines SET `item_name_ta` = 'வெண்டைக்காய்' WHERE LOWER(TRIM(`item_name_en`)) IN ('ladies finger', 'lady finger', 'ladiesfinger');
UPDATE bill_lines SET `item_name_ta` = 'கத்தரிக்காய்' WHERE LOWER(TRIM(`item_name_en`)) = 'brinjal';
UPDATE bill_lines SET `item_name_ta` = 'கேரட்' WHERE LOWER(TRIM(`item_name_en`)) = 'carrot';
UPDATE bill_lines SET `item_name_ta` = 'பச்சை மிளகாய்' WHERE LOWER(TRIM(`item_name_en`)) = 'green chilli';
UPDATE bill_lines SET `item_name_ta` = 'மிளகாய்' WHERE LOWER(TRIM(`item_name_en`)) = 'chilli';
UPDATE bill_lines SET `item_name_ta` = 'வெள்ளைப்பூசணி' WHERE LOWER(TRIM(`item_name_en`)) = 'ash gourd';
UPDATE bill_lines SET `item_name_ta` = 'பூசணிக்காய்' WHERE LOWER(TRIM(`item_name_en`)) = 'pumpkin';
UPDATE bill_lines SET `item_name_ta` = 'அவரைக்காய்' WHERE LOWER(TRIM(`item_name_en`)) = 'avarai beans';
UPDATE bill_lines SET `item_name_ta` = 'முருங்கை இலை' WHERE LOWER(TRIM(`item_name_en`)) = 'drumstick leaves';
UPDATE bill_lines SET `item_name_ta` = 'புடலங்காய்' WHERE LOWER(TRIM(`item_name_en`)) = 'ridge gourd';
UPDATE bill_lines SET `item_name_ta` = 'வெங்காயம்' WHERE LOWER(TRIM(`item_name_en`)) = 'onion';
UPDATE bill_lines SET `item_name_ta` = 'மாங்காய்' WHERE LOWER(TRIM(`item_name_en`)) = 'raw mango';
UPDATE bill_lines SET `item_name_ta` = 'சுரைக்காய்' WHERE LOWER(TRIM(`item_name_en`)) = 'bottle gourd';
UPDATE bill_lines SET `item_name_ta` = 'கொத்தவரங்காய்' WHERE LOWER(TRIM(`item_name_en`)) = 'cluster beans';
UPDATE bill_lines SET `item_name_ta` = 'கோவைக்காய்' WHERE LOWER(TRIM(`item_name_en`)) = 'ivy gourd';
UPDATE bill_lines SET `item_name_ta` = 'பாகற்காய்' WHERE LOWER(TRIM(`item_name_en`)) = 'bitter gourd';
UPDATE bill_lines SET `item_name_ta` = 'பீர்க்கங்காய்' WHERE LOWER(TRIM(`item_name_en`)) = 'snake gourd';
UPDATE bill_lines SET `item_name_ta` = 'வரி கத்தரி' WHERE LOWER(TRIM(`item_name_en`)) = 'striped brinjal';
UPDATE bill_lines SET `item_name_ta` = 'உருளைக்கிழங்கு' WHERE LOWER(TRIM(`item_name_en`)) = 'potato';
UPDATE bill_lines SET `item_name_ta` = 'கொத்து வெங்காயம்' WHERE LOWER(TRIM(`item_name_en`)) = 'spring onion';
UPDATE bill_lines SET `item_name_ta` = 'கருவேப்பிலை' WHERE LOWER(TRIM(`item_name_en`)) = 'curry leaves';

UPDATE bill_lines bl
JOIN items i ON (LOWER(TRIM(i.name_en)) = LOWER(TRIM(bl.item_name_en)) OR i.id = bl.item_id)
SET bl.item_name_ta = i.name_ta;

UPDATE purchase_lines SET `item_name_ta` = 'நெல்லிக்காய்' WHERE LOWER(TRIM(`item_name_en`)) IN ('nelli', 'amla');
UPDATE purchase_lines SET `item_name_ta` = 'தக்காளி' WHERE LOWER(TRIM(`item_name_en`)) = 'tomato';
UPDATE purchase_lines SET `item_name_ta` = 'வெண்டைக்காய்' WHERE LOWER(TRIM(`item_name_en`)) IN ('ladies finger', 'lady finger', 'ladiesfinger');
UPDATE purchase_lines SET `item_name_ta` = 'கத்தரிக்காய்' WHERE LOWER(TRIM(`item_name_en`)) = 'brinjal';
UPDATE purchase_lines SET `item_name_ta` = 'கேரட்' WHERE LOWER(TRIM(`item_name_en`)) = 'carrot';

UPDATE purchase_lines pl
JOIN items i ON (LOWER(TRIM(i.name_en)) = LOWER(TRIM(pl.item_name_en)) OR i.id = pl.item_id)
SET pl.item_name_ta = i.name_ta;