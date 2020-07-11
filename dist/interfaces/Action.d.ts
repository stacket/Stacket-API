export default interface Action {
    _id: string;
    command: ActionCommand;
    status: ActionResult;
    progress: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 | 100;
    message: string;
    started: number;
    finished: number;
    user: string;
    service: string;
    disk?: string;
    error?: {
        code: ActionError;
        message: string;
    };
}
export declare type ActionCommand = "hibernate_service" | "activate_service" | "start_service" | "stop_service" | "kill_service" | "command_service" | "update_service" | "npminstall_service" | "reactivate_service" | "disk_connect" | "disk_disconnect" | "network_connect" | "network_disconnect";
export declare type ActionResult = "running" | "error" | "warning" | "success";
export declare type ActionError = "db_notfound" | "service_alreadyactivated" | "files_error" | "container_runerror" | "service_notoffline" | "container_removeerror" | "service_hibernated" | "container_starterror" | "service_notonline" | "container_executeerror";
