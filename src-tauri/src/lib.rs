use tauri::{Manager, Size, LogicalSize, Position, LogicalPosition};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            // Получение основного окна приложения
            let window = app.get_webview_window("main").unwrap();

            // Получение размеров экрана
            if let Some(monitor) = app.app_handle().primary_monitor()? {
                let screen_size = monitor.size();
                let scale_factor = monitor.scale_factor();
                let logical_size = LogicalSize {
                    width: screen_size.width as f64 / scale_factor,
                    height: screen_size.height as f64 / scale_factor,
                };

                // Устанавливаем размеры окна на 100% от экрана
                window.set_size(Size::Logical(logical_size))?;

                // Центрируем окно
                let position = LogicalPosition {
                    x: 0.0, // Начальная позиция окна
                    y: 0.0,
                };
                window.set_position(Position::Logical(position))?;
            }

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
