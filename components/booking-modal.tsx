"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MockMentor } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CalendarIcon,
  Clock,
  Upload,
  X,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface BookingModalProps {
  mentor: MockMentor;
  isOpen: boolean;
  onClose: () => void;
}

interface BookingData {
  date: Date | undefined;
  time: string;
  bankSlip: File | null;
}

export function BookingModal({ mentor, isOpen, onClose }: BookingModalProps) {
  const router = useRouter();
  const [step, setStep] = useState<"schedule" | "payment">("schedule");
  const [bookingData, setBookingData] = useState<BookingData>({
    date: undefined,
    time: "",
    bankSlip: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available time slots (9 AM to 6 PM)
  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  const handleDateSelect = (date: Date | undefined) => {
    setBookingData((prev) => ({ ...prev, date }));
  };

  const handleTimeSelect = (time: string) => {
    setBookingData((prev) => ({ ...prev, time }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setBookingData((prev) => ({ ...prev, bankSlip: file }));
    }
  };

  const handleScheduleNext = () => {
    if (bookingData.date && bookingData.time) {
      setStep("payment");
    }
  };

  const handlePaymentSubmit = async () => {
    if (!bookingData.bankSlip) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Redirect to dashboard
    router.push("/dashboard/student");
  };

  const canProceedToPayment = bookingData.date && bookingData.time;
  const canSubmitPayment = bookingData.bankSlip;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold">
                {step === "schedule"
                  ? "Schedule this session"
                  : "Upload Bank Transfer Slip"}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {step === "schedule"
                  ? "Choose your preferred date and time"
                  : "Complete your payment"}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === "schedule" ? (
            <>
              {/* Session Details */}
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">
                        {mentor.initials}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium">
                        Session with {mentor.fullName}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {mentor.subjects.join(", ")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <Clock className="h-3 w-3" />2 hours
                    </Badge>
                    <Badge variant="outline">Fixed duration</Badge>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date Selection */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-primary" />
                    Choose a date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal h-12",
                          !bookingData.date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {bookingData.date ? (
                          format(bookingData.date, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={bookingData.date}
                        onSelect={handleDateSelect}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Time Selection */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    Choose a time
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={
                          bookingData.time === time ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => handleTimeSelect(time)}
                        className={cn(
                          "text-sm h-10",
                          bookingData.time === time &&
                            "ring-2 ring-primary ring-offset-2"
                        )}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  onClick={handleScheduleNext}
                  disabled={!canProceedToPayment}
                >
                  Next
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Session Summary */}
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">Session Summary</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>Session with: {mentor.fullName}</div>
                    <div>
                      Session Date:{" "}
                      {bookingData.date &&
                        format(bookingData.date, "dd/MM/yyyy")}
                    </div>
                    <div>Session Time: {bookingData.time}</div>
                    <div>Duration: 2 hours</div>
                  </div>
                </CardContent>
              </Card>

              {/* File Upload */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Bank Transfer Slip
                </Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="bank-slip-upload"
                  />
                  <Label
                    htmlFor="bank-slip-upload"
                    className="cursor-pointer flex flex-col items-center space-y-2"
                  >
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <span className="text-sm font-medium text-primary hover:text-primary/80">
                        Choose file
                      </span>
                      <span className="text-sm text-muted-foreground ml-1">
                        {bookingData.bankSlip
                          ? bookingData.bankSlip.name
                          : "No file chosen"}
                      </span>
                    </div>
                  </Label>
                </div>
                <p className="text-xs text-muted-foreground">
                  Please upload a clear image of your bank transfer slip to
                  confirm your payment.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="outline" onClick={() => setStep("schedule")}>
                  Back
                </Button>
                <Button
                  onClick={handlePaymentSubmit}
                  disabled={!canSubmitPayment || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Confirming...
                    </>
                  ) : (
                    "Confirm Payment"
                  )}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
