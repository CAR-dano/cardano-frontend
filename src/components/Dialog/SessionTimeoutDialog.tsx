"use client";

import React, { useEffect, useState } from "react";
import { AlertCircle, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

interface SessionTimeoutDialogProps {
  isOpen: boolean;
  onStayLoggedIn: () => void;
  onLogout: () => void;
  timeRemaining?: number; // in seconds
  countdownStart?: number; // in seconds
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

export default function SessionTimeoutDialog({
  isOpen,
  onStayLoggedIn,
  onLogout,
  timeRemaining = 60,
  countdownStart = 60,
}: SessionTimeoutDialogProps) {
  const [countdown, setCountdown] = useState(timeRemaining);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(timeRemaining);
      setProgress(100);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onLogout();
          return 0;
        }
        return prev - 1;
      });

      // Calculate progress percentage
      setProgress((countdown / countdownStart) * 100);
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, timeRemaining, countdown, countdownStart, onLogout]);

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[425px] rounded-lg p-6">
        <DialogHeader className="flex flex-col items-center space-y-4">
          <div className="bg-amber-100 rounded-full p-3">
            <Clock className="h-8 w-8 text-amber-600" />
          </div>
          <DialogTitle className="text-xl font-semibold text-center">
            Session Timeout Warning
          </DialogTitle>
        </DialogHeader>

        <div className="relative w-full h-2 bg-gray-200 rounded-full my-4">
          <div
            className="absolute top-0 left-0 h-full bg-amber-500 rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${Math.max(progress, 0)}%` }}
          ></div>
        </div>

        <DialogDescription className="text-center py-2">
          <p className="text-base text-gray-700 mb-2">
            Your session is about to expire due to inactivity.
          </p>
          <p className="text-lg font-semibold text-amber-600">
            {formatTime(countdown)}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Click &quot;Stay Logged In&quot; to continue your session.
          </p>
        </DialogDescription>

        <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-4">
          <Button
            variant="outline"
            onClick={onLogout}
            className="w-full sm:w-auto bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
          >
            Logout
          </Button>
          <Button
            onClick={onStayLoggedIn}
            className="w-full sm:w-auto bg-amber-500 text-white hover:bg-amber-600"
          >
            Stay Logged In
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
