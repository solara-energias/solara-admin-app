// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::RunEvent;

fn main() {
  tauri::Builder::default()
    .build(tauri::generate_context!())
    .expect("error while running tauri application")
    .run(|_app_handle, event| {
      if let RunEvent::Updater(updater_event) = event {
        dbg!(updater_event);
      }
    });
}
