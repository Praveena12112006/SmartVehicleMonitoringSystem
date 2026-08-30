import java.util.Scanner;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Main {
    public static Connection connectDatabase() {
    try {
        return DriverManager.getConnection(
            "jdbc:postgresql://localhost:5432/vehicle_db",
            "postgres",
            "praveena2006"
        );
    } catch (SQLException e) {
        System.out.println("Database Connection Failed!");
        e.printStackTrace();
        return null;
    }
}

    public static void main(String[] args) {
        Connection connection = connectDatabase();

if (connection != null) {
    System.out.println("Database Connected Successfully!");
}


        Scanner sc = new Scanner(System.in);
        VehicleManager manager = new VehicleManager();

    

        int choice;

        do {

            System.out.println("\n===== SMART VEHICLE MONITORING SYSTEM =====");
            System.out.println("1. View Vehicles");
            System.out.println("2. Search Vehicle");
            System.out.println("3. Add Vehicle");
            System.out.println("4. Delete Vehicle");
            System.out.println("5. Update Vehicle");
            System.out.println("6. Total Vehicles");
            System.out.println("7. Exit");
            System.out.print("Enter your choice: ");

            choice = sc.nextInt();
            sc.nextLine();

            switch (choice) {

                case 1:
                    manager.viewVehicles();
                    break;

                case 2:
                    System.out.print("Enter Vehicle Number: ");
                    String number = sc.nextLine();
                    manager.searchVehicle(number);
                    break;

                case 3:

                    System.out.print("Vehicle Number: ");
                    String vNo = sc.nextLine();

                    System.out.print("Owner Name: ");
                    String owner = sc.nextLine();

                    System.out.print("Vehicle Type: ");
                    String type = sc.nextLine();

                    System.out.print("Speed: ");
                    int speed = sc.nextInt();

                    System.out.print("Fuel Level: ");
                    int fuel = sc.nextInt();
                    sc.nextLine();

                    manager.addVehicle(new Vehicle(vNo, owner, type, speed, fuel));
                    break;

                case 4:

                    System.out.print("Enter Vehicle Number to Delete: ");
                    String deleteNo = sc.nextLine().trim();
                    manager.deleteVehicle(deleteNo);
                    break;

                case 5:

                    System.out.print("Enter Vehicle Number: ");
                    String updateNo = sc.nextLine();

                    System.out.print("New Speed: ");
                    int newSpeed = sc.nextInt();

                    System.out.print("New Fuel Level: ");
                    int newFuel = sc.nextInt();
                    sc.nextLine();

                    manager.updateVehicle(updateNo, newSpeed, newFuel);
                    break;

                case 6:
                    manager.totalVehicles();
                    break;

                case 7:
                    System.out.println("Thank You!");
                    break;

                default:
                    System.out.println("Invalid Choice!");
            }

        } while (choice != 7);

        sc.close();
    }
}