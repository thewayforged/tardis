Here's a summary of all the changes made:
1. Local Storage (data persists on close)
Swapped the storage backend from the in-memory ms object to localStorage. Every save (sv()) now writes to localStorage, and every load (ld()) reads from it. Your data will survive closing the app, rebooting the phone, everything.
2. Recurring tasks on the calendar

Added Yearly as a new recurrence option
When you set a recurrence (Weekly, Biweekly, Monthly, etc.), a "Recurs from" date picker appears so you can set exactly when the pattern starts — not just today
Fixed Weekly to step exactly 7 days from the start date (previously it matched by day-of-week which could drift)
Fixed Biweekly to step every 14 days correctly
Fixed Monthly to step by calendar month from the start date
All recurring events now show on the calendar for the next 3 months

How to use recurrence: Add Task → set Recurrence to anything other than None → a "Recurs from" date appears → set your start date → save. The calendar will populate accordingly.
