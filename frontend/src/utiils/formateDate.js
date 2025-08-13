export const formateDate = (utcDateString) => {
    // Create a Date object from the UTC string
    const date = new Date(utcDateString);

    // Define options for formatting the date
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timeZone: 'Asia/Dhaka'
    };

    // Format the date to 'Jan 4, 2025' and convert to the 'Asia/Dhaka' time zone
    const dhakaTime = date.toLocaleDateString('en-US', options);

    return dhakaTime;
}