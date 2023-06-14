namespace CattleFarmAPI.Services
{
    public class CattleServices
    {
        public string bornDateToAge(DateTime bornDate) {

            DateTime today = DateTime.Now;
            int daysDifference = (int)(today.Subtract(bornDate).TotalDays);

            int ageYears = (int)(daysDifference / 365);
            int ageMonths = (int)((daysDifference % 365) / 30);
            int ageDays = (int)((daysDifference % 365) % 30);
            
            string age = "";

            if (ageYears>0)
            {
                age = age + ageYears.ToString()+"y ";
            }
            if (ageMonths>0) {
                age = age + ageMonths.ToString() + "m ";
            }

            age = age + ageDays.ToString() + "d";

            return age.Trim();
        }
    }
}
