export function formatMinutes(minutes: number): string {
    if (minutes < 60) {
      return `${minutes} minutes`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      const formattedHours = hours.toString().padStart(2, '0');
      const formattedMinutes = remainingMinutes.toString().padStart(2, '0');
      return `${formattedHours}h ${formattedMinutes}min`;
    }
  }