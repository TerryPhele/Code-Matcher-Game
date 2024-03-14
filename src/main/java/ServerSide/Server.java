package ServerSide;

import io.javalin.Javalin;
import io.javalin.http.staticfiles.Location;

public class Server{

    private static final String PAGES_DIR = "/clientSide";
    private static final int PORT = 7000;
    private final Javalin server;

    public Server(){
        this.server = Javalin.create( configure -> {
            configure.addStaticFiles(PAGES_DIR, Location.CLASSPATH);
        });
    }

    public void runServer( int port){
        this.server.start(port);
    }

    public void stopServer()
    {
        this.server.close();
        this.server.stop();
    }

    public static void main(String[] args) {
        Server runningServer = new Server();
        runningServer.runServer(PORT);
    }

}