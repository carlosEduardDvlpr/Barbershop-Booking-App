export interface BookingDateSelectionProps {
  setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sheetOpen: boolean;
  date: Date | undefined;
  handleDayClick: (date: Date | undefined) => void;
  timeList: string[];
  hour: string | undefined;
  handleHourClick: (time: string) => void;
  loading: boolean;
  handleBooking: () => Promise<void>;
}
