import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class VehicleManager {

    private Connection getConnection() {
        try {
            return DriverManager.getConnection(
                "jdbc:postgresql://localhost:5432/vehicle_db",
                "postgres",
                "praveena2006"
            );
        } catch (Exception e) {
            System.out.println("Database Connection Failed!");
            e.printStackTrace();
            return null;
        }
    }


    // Add Vehicle
    public void addVehicle(Vehicle vehicle) {

        String sql = "INSERT INTO public.vehicles " +
                     "(vehicle_number, owner_name, vehicle_type, speed, fuel_level) " +
                     "VALUES (?, ?, ?, ?, ?)";

        try (Connection con = getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, vehicle.vehicleNumber);
            ps.setString(2, vehicle.ownerName);
            ps.setString(3, vehicle.vehicleType);
            ps.setInt(4, vehicle.speed);
            ps.setInt(5, vehicle.fuelLevel);

            ps.executeUpdate();

            System.out.println("Vehicle Added Successfully!");

        } catch (Exception e) {
            System.out.println("Database Error!");
            e.printStackTrace();
        }
    }


    // View All Vehicles
    public void viewVehicles() {

        String sql = "SELECT * FROM public.vehicles";

        try (Connection con = getConnection();
             java.sql.Statement stmt = con.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {

                System.out.println("-----------------------------");

                System.out.println(
                    "Vehicle Number : " +
                    rs.getString("vehicle_number")
                );

                System.out.println(
                    "Owner Name     : " +
                    rs.getString("owner_name")
                );

                System.out.println(
                    "Vehicle Type   : " +
                    rs.getString("vehicle_type")
                );

                System.out.println(
                    "Speed          : " +
                    rs.getInt("speed") +
                    " km/h"
                );

                System.out.println(
                    "Fuel Level     : " +
                    rs.getInt("fuel_level") +
                    "%"
                );

                System.out.println("-----------------------------");
            }

        } catch (Exception e) {

            System.out.println("Database Error!");
            e.printStackTrace();
        }
    }


    public void searchVehicle(String number) {

    String sql = "SELECT * FROM public.vehicles WHERE TRIM(vehicle_number) = TRIM(?)";

    try (Connection con = getConnection();
         PreparedStatement ps = con.prepareStatement(sql)) {

        ps.setString(1, number.trim());

        ResultSet rs = ps.executeQuery();

        if (rs.next()) {

            System.out.println("\nVehicle Found");
            System.out.println("-----------------------------");
            System.out.println("Vehicle Number : " + rs.getString("vehicle_number"));
            System.out.println("Owner Name     : " + rs.getString("owner_name"));
            System.out.println("Vehicle Type   : " + rs.getString("vehicle_type"));
            System.out.println("Speed          : " + rs.getInt("speed") + " km/h");
            System.out.println("Fuel Level     : " + rs.getInt("fuel_level") + "%");
            System.out.println("-----------------------------");

        } else {

            System.out.println("Vehicle Not Found!");
        }

    } catch (Exception e) {

        System.out.println("Database Error!");
        e.printStackTrace();
    }
}


    // Delete Vehicle
    public void deleteVehicle(String number) {

        String sql = "DELETE FROM public.vehicles WHERE TRIM(vehicle_number) = TRIM(?)";
        try (Connection con = getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, number);

            int rows = ps.executeUpdate();

            if (rows > 0) {

                System.out.println(
                    "Vehicle Deleted Successfully!"
                );

            } else {

                System.out.println(
                    "Vehicle Not Found!"
                );
            }

        } catch (Exception e) {

            System.out.println("Database Error!");
            e.printStackTrace();
        }
    }


    // Update Vehicle
    public void updateVehicle(
        String number,
        int speed,
        int fuelLevel
    ) {

        String sql =
    "UPDATE public.vehicles " +
    "SET speed = ?, fuel_level = ? " +
    "WHERE TRIM(vehicle_number) = TRIM(?)";

        try (Connection con = getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, speed);
            ps.setInt(2, fuelLevel);
            ps.setString(3, number);

            int rows = ps.executeUpdate();

            if (rows > 0) {

                System.out.println(
                    "Vehicle Updated Successfully!"
                );

            } else {

                System.out.println(
                    "Vehicle Not Found!"
                );
            }

        } catch (Exception e) {

            System.out.println("Database Error!");
            e.printStackTrace();
        }
    }


    // Total Vehicles
    public void totalVehicles() {

        String sql =
            "SELECT COUNT(*) FROM public.vehicles";

        try (Connection con = getConnection();
             java.sql.Statement stmt =
                 con.createStatement();
             ResultSet rs =
                 stmt.executeQuery(sql)) {

            if (rs.next()) {

                System.out.println(
                    "Total Vehicles : " +
                    rs.getInt(1)
                );
            }

        } catch (Exception e) {

            System.out.println("Database Error!");
            e.printStackTrace();
        }
    }
}