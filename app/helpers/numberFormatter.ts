const formatAndConvertToPersian = (number: number | string): string => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  // Use a regular expression to add commas every three digits from the right
  const formattedNumber = number
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Replace each digit with its Persian equivalent
  const persianNumber: string = formattedNumber.replace(
    /\d/g,
    (digit) => persianDigits[parseInt(digit)]
  );

  return persianNumber;
};

export default formatAndConvertToPersian;
